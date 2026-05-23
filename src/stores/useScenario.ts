"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  formatRelativeTime,
  type LogVariant,
  SCENARIOS,
} from "@/data/scenarios";
import { DISCLAIMER_COOKIE, getCookie, setCookie } from "@/utils/cookies";
import { runScenario } from "@/utils/scenarioRunner";

export type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
  isTyping?: boolean;
};

export type LogEntry = {
  id: string;
  t: string;
  action: string;
  detail: string;
  variant: LogVariant;
};

export type Status = "idle" | "running" | "aborted" | "completed";
export type ScenarioId = 1 | 2 | 3;

type State = {
  status: Status;
  currentScenarioId: ScenarioId | null;
  messages: Message[];
  logs: LogEntry[];
  attackActive: boolean;
  aiThinking: boolean;
  showDisclaimer: boolean;
  showExplanation: boolean;
  completedScenarioId: ScenarioId | null;
};

type Action =
  | { type: "START"; scenarioId: ScenarioId }
  | { type: "APPEND_MESSAGE"; message: Message }
  | { type: "STOP_TYPING"; id: string }
  | { type: "APPEND_LOG"; entry: LogEntry }
  | { type: "ATTACK"; active: boolean }
  | { type: "THINKING"; on: boolean }
  | { type: "ABORT" }
  | { type: "COMPLETE" }
  | { type: "CLOSE_EXPLANATION" }
  | { type: "OPEN_DISCLAIMER" }
  | { type: "CLOSE_DISCLAIMER" }
  | { type: "INIT_DISCLAIMER"; show: boolean };

const initialState: State = {
  status: "idle",
  currentScenarioId: null,
  messages: [],
  logs: [],
  attackActive: false,
  aiThinking: false,
  showDisclaimer: false,
  showExplanation: false,
  completedScenarioId: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return {
        ...state,
        status: "running",
        currentScenarioId: action.scenarioId,
        messages: [],
        logs: [],
        attackActive: false,
        aiThinking: false,
        showExplanation: false,
        completedScenarioId: null,
      };
    case "APPEND_MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    case "STOP_TYPING":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.id ? { ...m, isTyping: false } : m,
        ),
      };
    case "APPEND_LOG":
      return { ...state, logs: [...state.logs, action.entry] };
    case "ATTACK":
      return { ...state, attackActive: action.active };
    case "THINKING":
      return { ...state, aiThinking: action.on };
    case "ABORT":
      return {
        ...state,
        status: "idle",
        currentScenarioId: null,
        messages: [],
        logs: [],
        attackActive: false,
        aiThinking: false,
        completedScenarioId: null,
      };
    case "COMPLETE":
      return {
        ...state,
        status: "completed",
        attackActive: false,
        aiThinking: false,
        completedScenarioId: state.currentScenarioId,
        showExplanation: state.currentScenarioId !== null,
      };
    case "CLOSE_EXPLANATION":
      return { ...state, showExplanation: false };
    case "OPEN_DISCLAIMER":
      return { ...state, showDisclaimer: true };
    case "CLOSE_DISCLAIMER":
      return { ...state, showDisclaimer: false };
    case "INIT_DISCLAIMER":
      return { ...state, showDisclaimer: action.show };
    default:
      return state;
  }
}

let messageIdCounter = 0;
let logIdCounter = 0;
const nextMessageId = () => {
  messageIdCounter += 1;
  return `msg-${messageIdCounter}`;
};
const nextLogId = () => {
  logIdCounter += 1;
  return `log-${logIdCounter}`;
};

export function useScenario() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const accepted = getCookie(DISCLAIMER_COOKIE) === "true";
    dispatch({ type: "INIT_DISCLAIMER", show: !accepted });
  }, []);

  useEffect(() => {
    return () => {
      cancelRef.current?.();
    };
  }, []);

  const startScenario = useCallback((scenarioId: ScenarioId) => {
    cancelRef.current?.();
    dispatch({ type: "START", scenarioId });
    const scenario = SCENARIOS[scenarioId];
    cancelRef.current = runScenario(scenario.events, {
      onUserMessage: (text) => {
        dispatch({
          type: "APPEND_MESSAGE",
          message: { id: nextMessageId(), role: "user", text },
        });
        dispatch({ type: "THINKING", on: true });
      },
      onAiMessage: (text) => {
        dispatch({ type: "THINKING", on: false });
        const id = nextMessageId();
        dispatch({
          type: "APPEND_MESSAGE",
          message: { id, role: "ai", text, isTyping: true },
        });
        const finishDelay = Math.min(text.length * 25 + 500, 4000);
        const finishTimer = setTimeout(() => {
          dispatch({ type: "STOP_TYPING", id });
        }, finishDelay);
        const prevCancel = cancelRef.current;
        cancelRef.current = () => {
          clearTimeout(finishTimer);
          prevCancel?.();
        };
      },
      onLog: (action, detail, variant, relMs) => {
        dispatch({
          type: "APPEND_LOG",
          entry: {
            id: nextLogId(),
            t: formatRelativeTime(relMs),
            action,
            detail,
            variant,
          },
        });
      },
      onAttackChange: (active) => {
        dispatch({ type: "ATTACK", active });
      },
      onComplete: () => {
        dispatch({ type: "COMPLETE" });
        cancelRef.current = null;
      },
    });
  }, []);

  const abortScenario = useCallback(() => {
    cancelRef.current?.();
    cancelRef.current = null;
    dispatch({ type: "ABORT" });
  }, []);

  const closeExplanation = useCallback(() => {
    dispatch({ type: "CLOSE_EXPLANATION" });
  }, []);

  const openDisclaimer = useCallback(() => {
    dispatch({ type: "OPEN_DISCLAIMER" });
  }, []);

  const acceptDisclaimer = useCallback(() => {
    setCookie(DISCLAIMER_COOKIE, "true", {
      maxAgeSeconds: 60 * 60 * 24 * 365,
      sameSite: "Lax",
    });
    dispatch({ type: "CLOSE_DISCLAIMER" });
  }, []);

  return {
    state,
    startScenario,
    abortScenario,
    closeExplanation,
    openDisclaimer,
    acceptDisclaimer,
  };
}

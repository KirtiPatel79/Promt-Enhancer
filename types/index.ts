export enum UserRole {
  DEVELOPER = "developer",
  DESIGNER = "designer",
  MARKETER = "marketer",
  CONTENT_CREATOR = "content_creator",
  ANALYST = "analyst",
  GENERAL = "general"
}

export interface PromptRequest {
  original_prompt: string;
  user_role: UserRole;
  optimization_level: string;
}

export interface PromptResponse {
  enhanced_prompt: string;
  thinking_process: string;
  original_tokens: number;
  enhanced_tokens: number;
  token_savings: number;
  cost_savings_usd: number;
  processing_time: number;
  formatted_response: string;
}

export interface UserInfo {
  ip_address: string;
  user_agent: string;
  browser: string;
  device: string;
  os: string;
  is_mobile: boolean;
  timestamp: string;
}

export interface ApiResponse {
  success: boolean;
  data?: PromptResponse;
  error?: string;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}
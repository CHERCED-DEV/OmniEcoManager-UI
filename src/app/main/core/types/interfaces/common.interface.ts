import { CommonInputType, KeyInputConfig } from "../enums/validation_types.enum";
import {
  ButtonConfig,
  ImgsSimpleConfig,
  InputConfig,
  LinkConfig
} from "./ui-elements.interface";

//atoms
interface AlertConfig {
  main_text: string;
  label: string;
  link: LinkConfig;
}

interface SearchConfig {
  input: InputConfig;
  button: string;
}

interface SocialMediaConfig {
  link: LinkConfig;
  img: ImgsSimpleConfig;
}

interface CopyrightConfig {
  title: string;
  img: ImgsSimpleConfig;
}

interface NewsLetterConfig {
  title: string;
  input: InputConfig;
  button: ButtonConfig;
}


// molecules

export interface HeaderConfig {
  brand_logo: ImgsSimpleConfig;
  search: SearchConfig;
  alerts: AlertConfig[];
}

export interface FooterConfig {
  brand_logo: ImgsSimpleConfig;
  newsletter: NewsLetterConfig;
  socialmedia: SocialMediaConfig[];
  copyright: CopyrightConfig;
}

export interface StarterConfig {
  img: ImgsSimpleConfig;
  message: string;
}

export interface LayoutConfig {
  header: HeaderConfig;
  footer: FooterConfig;
  starter: StarterConfig;
}

type inputsRegexsConfig = {
  [key in KeyInputConfig]: string;
}

type inputsTypesConfig = {
  [key in CommonInputType]: string;
}

export interface ErrorMessagesInputConfig extends inputsTypesConfig {
}
export interface RegexInputConfigs extends inputsRegexsConfig {
}

export interface CommonApiConfig {
  layout: LayoutConfig;
  error_messages: ErrorMessagesInputConfig
  regex: RegexInputConfigs;
}

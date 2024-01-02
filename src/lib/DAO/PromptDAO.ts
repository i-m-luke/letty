import type { Db as DB } from "mongodb";
import { Prompt, type Prompt, type PostPrompt } from "$types";
import BaseDAO from "./BaseDAO";

export default class PromptDAO extends BaseDAO<Prompt, PostPrompt> {
  constructor(db: DB) {
    super(db, "prompts", Prompt);
  }
}

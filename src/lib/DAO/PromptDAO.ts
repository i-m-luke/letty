import type { Db as DB } from "mongodb";
import { PromptSchema, type Prompt, type NewPrompt } from "$types";
import BaseDAO from "./BaseDAO";

export default class PromptDAO extends BaseDAO<Prompt, NewPrompt> {
  constructor(db: DB) {
    super(db, "prompts", PromptSchema);
  }
}

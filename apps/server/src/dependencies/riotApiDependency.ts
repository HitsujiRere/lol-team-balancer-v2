import { createRiotApi } from "@/infrastructure/createRiotApi";
import { Dependency } from "./Dependency";

/**
 * RiotApiのDIコンテナ。
 */
export const riotApiDependency = new Dependency(() => createRiotApi());

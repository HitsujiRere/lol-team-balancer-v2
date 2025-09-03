import { createRiotApi } from "@/infrastructure/createRiotApi";
import { Dependency } from "./Dependency";

export const riotApiDependency = new Dependency(() => createRiotApi());

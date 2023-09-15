import "module-alias/register";
import { ensureConnection } from "./db";

ensureConnection().then(() => import("./server"));

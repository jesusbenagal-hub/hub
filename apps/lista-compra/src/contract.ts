import type { RemoteAppModule } from "@hub/shared";

import * as exposedApp from "./app";

exposedApp satisfies RemoteAppModule;

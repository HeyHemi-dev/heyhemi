import { sharesiesCaseStudy } from "./sharesies";
import { withThanksCaseStudy } from "./with-thanks";
import { weddingReadyCaseStudy } from "./wedding-ready";
import { knowieCaseStudy } from "./knowie";
import { maydayCaseStudy } from "./mayday";
import { mcpCaseStudy } from "./mcp";

import type { CaseStudy } from "../types";

export {
  sharesiesCaseStudy,
  weddingReadyCaseStudy,
  withThanksCaseStudy,
  maydayCaseStudy,
  knowieCaseStudy,
  mcpCaseStudy,
};

export const allCaseStudies: CaseStudy[] = [
  withThanksCaseStudy,
  weddingReadyCaseStudy,
];

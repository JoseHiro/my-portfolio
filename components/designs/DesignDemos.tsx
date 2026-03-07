"use client";

import { type DesignSlug } from "@/lib/designs";
import { DemoFreelancer } from "./DemoFreelancer";
import { DemoHairSalon } from "./DemoHairSalon";
import { DemoRestaurant } from "./DemoRestaurant";
import { DemoSmallBusiness } from "./DemoSmallBusiness";
import { DemoEcommerce } from "./DemoEcommerce";
import { DemoSaaS } from "./DemoSaaS";
import { DemoPortfolioAgency } from "./DemoPortfolioAgency";
import { DemoMedical } from "./DemoMedical";

export function DesignDemos({ slug }: { slug: DesignSlug }) {
  switch (slug) {
    case "freelancer":
      return <DemoFreelancer />;
    case "hair-salon":
      return <DemoHairSalon />;
    case "restaurant":
      return <DemoRestaurant />;
    case "small-business":
      return <DemoSmallBusiness />;
    case "ecommerce":
      return <DemoEcommerce />;
    case "saas":
      return <DemoSaaS />;
    case "creative-agency":
      return <DemoPortfolioAgency />;
    case "medical":
      return <DemoMedical />;
    default:
      return null;
  }
}

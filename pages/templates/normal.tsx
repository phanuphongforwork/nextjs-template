import { FullLayout } from "@/components/layouts/FullLayout.component";
import { useState } from "react";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";

export default function NormalPage() {
  const metaTag = {
    title: "Template Normal",
  };

  const header = {
    title: "Normal Page",
    subtitle:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum earum incidunt in cum quas cupiditate quam tempore! Qui facilis inventore tempore sit, itaque ratione rem temporibus! Ex aliquam sed natus.",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Templates Normal", href: "/templates/normal", current: true },
  ];

  return (
    <>
      <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
        <div className=" gap-4 flex flex-col">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil modi
            recusandae, corrupti eum fugiat asperiores voluptate magnam natus
            sed sint nam necessitatibus. Praesentium facere eligendi corrupti
            accusantium ad, error ex?
          </div>
        </div>
      </FullLayout>
    </>
  );
}

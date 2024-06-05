import { Button } from "@/components/ui/button";
import React from "react";

const PricingPage = () => {
  return (
    <section>
      <div className="flex flex-col items-center px-5 py-16 md:px-10 md:py-10 lg:p y-32">
        <div className="mb-8 w-full max-w-3xl text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold md:text-5xl">
            Simple & Affordable Pricing
          </h2>

          <p className="mt-4 text-sm text-[#636262] sm:text-base">
            Simple & fixed pricing. 30 days money-back guarantee
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex max-w-md flex-col items-start rounded-md border border-[#cdcdcd] p-8">
            <div className="mb-4 rounded-[4px] bg-[#0F452E] px-4 py-1.5">
              <p className="text-sm font-bold text-white sm:text-sm">MONTHLY</p>
            </div>
            <p className="mb-6 text-base font-light text-[#636262] md:mb-10 lg:mb-12">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,
              purus sit
            </p>
            <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-5xl lg:mb-8">
              $70<span className="text-sm font-light sm:text-sm">/month</span>
            </h2>
            <Button
              variant="primary"
              className="mb-5 py-6 w-full md:mb-6 lg:mb-8"
            >
              Get Started
            </Button>
            {/* <a href="#" className="mb-5 w-full rounded-md bg-black px-6 py-3 text-center font-semibold text-white md:mb-6 lg:mb-8">Get started</a> */}
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Premium Designs</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Exclusive Freebies</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Monthly Free Exclusive</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Customer Support</p>
            </div>
          </div>
          <div className="flex max-w-md flex-col items-start rounded-md border border-[#cdcdcd] bg-[#f2f2f7] p-8">
            <div className="mb-4 rounded-[4px] bg-[#0F452E] px-4 py-1.5">
              <p className="text-sm font-bold text-white sm:text-sm">YEARLY</p>
            </div>
            <p className="mb-6 text-base font-light text-[#636262] md:mb-10 lg:mb-12">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,
              purrounded-md
            </p>
            <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-5xl lg:mb-8">
              $500<span className="text-sm font-light sm:text-sm">/year</span>
            </h2>
            <Button
              variant="primary"
              className="mb-5 py-6 w-full md:mb-6 lg:mb-8"
            >
              Get Started
            </Button>
            {/* <a href="#" className="mb-5 w-full rounded-md bg-black px-6 py-3 text-center font-semibold text-white md:mb-6 lg:mb-8">Get started</a> */}
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Premium Designs</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Exclusive Freebies</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Monthly Free Exclusive</p>
            </div>
            <div className="mt-2 flex flex-row items-center">
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94a84be6cf60_check-mark.svg"
                alt=""
                className="mr-2 inline-block w-4"
              />
              <p className="text-base">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;

"use client";

import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaChevronDown, FaWallet } from "react-icons/fa6";
export default function ConnectBtn() {
  const { deviceType } = useScreenSizeContext();
  return (
    <div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      className="bg-primary rounded-full px-5 py-1 font-bold text-white lg:border-primary lg:border hover:bg-transparent hover:border hover:text-primary hover:border-primary transition-colors ease-in duration-200"
                      onClick={openConnectModal}
                      type="button"
                    >
                      {deviceType === "mobile" ? "Connect" : "Connect Wallet"}
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="bg-primary font-bold text-white rounded-full px-3 py-1 gap-1 md:gap-3 md:max-w-[30vw] transition ease-in duration-200 lg:hover:bg-secondary"
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            borderRadius: 999,
                            overflow: "hidden",
                          }}
                          className="w-7 h-7 bg-primary"
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: "100%", height: "100%" }}
                            />
                          )}
                        </div>
                      )}
                      <span className="hidden md:block"> {chain.name}</span>
                      <span className="">
                        <FaChevronDown />
                      </span>
                    </button>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="bg-primary font-bold text-white rounded-full px-3 py-1 flex items-center gap-1 transition ease-in duration-200 lg:hover:bg-secondary"
                    >
                      <span className="bg-secondary rounded-full w-7 h-7 flex items-center justify-center">
                        <FaWallet />
                      </span>
                      <span className="hidden md:block overflow-hidden truncate">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </span>
                      <span>
                        <FaChevronDown />
                      </span>
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

import { Solana } from "@glow-app/solana-client";
import classNames from "classnames";
import React from "react";
import { useGlowContext } from "../GlowContext";
import { GlowIcon } from "../assets/GlowIcon";
import { GlowIcon3D } from "../assets/GlowIcon3D";

type Props = StyledProps | RenderProps;

type RenderProps = {
  render: (props: {
    glowDetected: boolean;
    signIn: () => Promise<{
      wallet: Solana.Address;
      signatureBase64: string;
      message: string;
    }>;
  }) => React.ReactNode;
};

type StyledProps = {
  size?: "lg" | "md" | "sm";
  shape?: "squared" | "rounded";
  variant?: "black" | "purple" | "white-naked" | "white-outline";
} & Omit<React.HTMLProps<HTMLButtonElement>, "onClick" | "type" | "size">;

export const GlowSignInButton = (props: Props) => {
  if ("render" in props) {
    return <CustomGlowSignInButton {...props} />;
  }

  return <StyledGlowSignInButton {...props} />;
};

const CustomGlowSignInButton = ({ render }: RenderProps) => {
  const { glowDetected, signIn } = useGlowContext();
  return <>{render({ glowDetected, signIn })}</>;
};

const StyledGlowSignInButton = ({
  className,
  disabled: _disabled,
  size = "md",
  shape = "squared",
  variant = "black",
  ...props
}: StyledProps) => {
  const { glowDetected, signIn } = useGlowContext();

  return (
    <button
      className={classNames(className, "glow--sign-in-button", {
        "glow--size-lg": size === "lg",
        "glow--size-md": size === "md",
        "glow--size-sm": size === "sm",
        "glow--shape-squared": shape === "squared",
        "glow--shape-rounded": shape === "rounded",
        "glow--variant-black": variant === "black",
        "glow--variant-purple": variant === "purple",
        "glow--variant-white-naked": variant === "white-naked",
        "glow--variant-white-outline": variant === "white-outline",
      })}
      disabled={_disabled || !glowDetected}
      onClick={async () => {
        await signIn();
      }}
      type="button"
      {...props}
    >
      <div className="glow--button-content">
        {variant === "purple" ? (
          <GlowIcon3D aria-hidden="true" className="glow--icon glow--icon-3d" />
        ) : (
          <GlowIcon aria-hidden="true" className="glow--icon" />
        )}
        <span className="glow--sign-in-button-text">Sign In with Glow</span>
      </div>
    </button>
  );
};

import React, { forwardRef } from "react";
import { cn } from "../../Utils/Cn";

const Card = forwardRef(function Card(props, ref) {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...rest}
    />
  );
});
Card.displayName = "Card";

const CardHeader = forwardRef(function CardHeader(props, ref) {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...rest} />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(function CardTitle(props, ref) {
  const { className, ...rest } = props;
  return (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...rest}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(function CardDescription(props, ref) {
  const { className, ...rest } = props;
  return (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...rest} />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(function CardContent(props, ref) {
  const { className, ...rest } = props;
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />;
});
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(function CardFooter(props, ref) {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...rest} />
  );
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

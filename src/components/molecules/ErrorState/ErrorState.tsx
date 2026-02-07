import { Button } from "src/components/atoms/Button";
import { Text } from "src/components/atoms/Text";

type ErrorStateProps = {
  error: Error;
  onRetry: () => void;
  variant?: "overlay" | "inline";
};

export const ErrorState = ({
  error,
  onRetry,
  variant = "overlay",
}: ErrorStateProps) => {
  return (
    <div
      data-testid="error-state"
      className={`error-state error-state--${variant}`}
    >
      <Text className="error-state__message">{error.message}</Text>
      <Button onClick={onRetry} testId="try-again-button">
        Try Again
      </Button>
    </div>
  );
};

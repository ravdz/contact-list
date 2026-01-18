import { Button } from "src/components/atoms/Button";
import { Text } from "src/components/atoms/Text";

type ErrorStateProps = {
    error: Error;
    fetchData: () => void;
};

export const ErrorState = ({ error, fetchData }: ErrorStateProps) => {
    return (
        <div data-testid="error-state" className="error-state">
            <Text as="p" className="error-state__message">{error.message}</Text>
            <Button onClick={fetchData}>
                Try Again
            </Button>
        </div>
    );
};
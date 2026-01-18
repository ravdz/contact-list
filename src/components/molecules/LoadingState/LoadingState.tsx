import { Spinner } from "src/components/atoms/Spinner";

export const LoadingState = () => (
        <div data-testid="loading-state" className="loading-state">
            <Spinner />
        </div>
    );

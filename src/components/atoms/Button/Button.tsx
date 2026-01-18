type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    testId?: string;
};

export const Button = ({ children, onClick, className, disabled, type = 'button', testId }: ButtonProps) => (
    <button 
        type={type} 
        onClick={onClick} 
        className={`btn ${className ?? ''}`} 
        disabled={disabled}
        data-testid={testId}
    >
        {children}
    </button>
);

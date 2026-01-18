type TextProps = {
    children: React.ReactNode;
    as?: 'p' | 'span';
    className?: string;
};

export const Text = ({ children, as: Tag = 'p', className }: TextProps) => <Tag className={`text ${className ?? ''}`}>{children}</Tag>;


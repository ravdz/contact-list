type HeadingProps = {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
};

export const Heading = ({ children, as: Tag = 'h2', className }: HeadingProps) => <Tag className={`heading ${className ?? ''}`}>{children}</Tag>;


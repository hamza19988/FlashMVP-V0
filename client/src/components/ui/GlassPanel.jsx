export function GlassPanel({
  as: Tag = 'section',
  className = '',
  padded = true,
  children,
  ...rest
}) {
  return (
    <Tag className={`glass ${padded ? 'glass--padded' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

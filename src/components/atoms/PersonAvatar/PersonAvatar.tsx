type PersonAvatarProps = {
    src?: string;
    fullName: string;
}

export const PersonAvatar = ({ fullName, src }: PersonAvatarProps) => {
    const initials = fullName.split(' ').map(name => name[0]).slice(0, 2).join('');
    return (
        <div className="avatar">
            {src ? <img className="avatar__image" src={src} alt={fullName} /> : <span className="avatar__initials">{initials}</span>}
        </div>
    );
};
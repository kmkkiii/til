import "zenn-content-css";

type Props = {
  html: string;
};

export const Post: React.FC<Props> = ({ html }) => {
  return (
    <div
      className="znc "
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
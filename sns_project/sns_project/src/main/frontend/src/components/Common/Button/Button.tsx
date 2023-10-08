import "./Button.css";

interface ButtonProp {
  type: "button" | "submit" | "reset" | undefined;
  design?: string;
  text: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
}

const Button = ({ ...props }: ButtonProp): JSX.Element => {
  return (
    <button {...props} disabled={props.disabled} type={props.type} className={props.design}>
      {props.icon}
      {props.text}
    </button>
  );
};

export default Button;

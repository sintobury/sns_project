import { useSelector } from "react-redux";
import "./Button.css";
import { RootState } from "../../../redux";

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
  const isDarkmode = useSelector((state: RootState) => state.darkmodeSlice.isDarkmode);
  return (
    <button
      {...props}
      disabled={props.disabled}
      type={props.type}
      className={`${props.design} ${isDarkmode && "darkmode"}`}
    >
      {props.icon}
      {props.text}
    </button>
  );
};

export default Button;

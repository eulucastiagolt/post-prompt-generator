import AlertError from "./AlertError";
import AlertSuccess from "./alert-success";
import AlertWarning from "./alert-warning";

interface AlertAreaProps {
  show?: boolean;
  type?: string;
  message?: string;
  title?: string;
  closeFunction?: React.MouseEventHandler<HTMLButtonElement>;
}

const AlertType = ({ type, message, title, closeFunction }: AlertAreaProps) => {
  if (type === "success") {
    return <AlertSuccess message={message} title={title} closeFunction={closeFunction} />;
  } else if (type === "warning") {
    return <AlertWarning message={message} title={title} closeFunction={closeFunction} />;
  } else if (type === "error") {
    return <AlertError message={message} title={title} closeFunction={closeFunction} />;
  } else {
    return <AlertSuccess message={message} title={title} closeFunction={closeFunction} />;
  }
};

const AlertArea = ({ show, type, message, title, closeFunction }: AlertAreaProps) => {
  return (
    <div className={`fixed w-full z-[99999] transition-all duration-300 left-0 ${show ? " top-0" : " -top-full"}`}>
      <AlertType type={type} message={message} title={title} closeFunction={closeFunction} />
    </div>
  );
};

export default AlertArea;

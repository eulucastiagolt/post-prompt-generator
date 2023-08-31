import { AlertSuccess } from "./alerts";

interface AlertAreaProps {
  show: boolean;
  message?: string;
  title?: string;
  closeFunction?: React.MouseEventHandler<HTMLButtonElement>;
}

const AlertArea: React.FC<AlertAreaProps> = ({ show, message, title, closeFunction }) => {
  return (
    <div className={`absolute w-full z-[99999] bg-white/10 transition-all duration-300 ${show ? " top-0" : " -top-full"}`}>
      <AlertSuccess message={message} title={title} closeFunction={closeFunction} />
    </div>
  );
};

export default AlertArea;

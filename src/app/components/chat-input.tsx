import { BsArrowUpCircle, BsArrowUpCircleFill } from "react-icons/bs";
import { FaStopCircle } from "react-icons/fa";

type ChatInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
};

export const ChatInput = ({
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  onCancel,
  isLoading,
}: ChatInputProps) => {
  const buttonDisabled = value.length === 0;
  const buttonClasses =
    "absolute bottom-2 right-2 p-0.5 rounded-full focus:ring-2";
  const iconProperties = { size: 22, className: "fill-highlight" };
  return (
    <div className="w-screen fixed bottom-0 py-4 flex justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
      <div className="relative sm:w-full sm:px-0 sm:max-w-none md:w-3/5 md:max-w-2xl">
        <label className="flex flex-col gap-2">
          <span>{label}</span>
          <textarea
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            className="w-full px-4 py-3 border rounded-2xl bg-transparent resize-none"
          />
        </label>
        {isLoading ? (
          <button
            aria-label="Stop the request"
            type="button"
            onClick={onCancel}
            className={buttonClasses}
          >
            <FaStopCircle {...iconProperties} />
          </button>
        ) : (
          <button
            aria-label="Send your message"
            type="button"
            onClick={onSubmit}
            disabled={buttonDisabled}
            className={buttonClasses}
          >
            {buttonDisabled ? (
              <BsArrowUpCircle {...iconProperties} />
            ) : (
              <BsArrowUpCircleFill {...iconProperties} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

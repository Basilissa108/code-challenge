import { BsArrowUpCircle, BsArrowUpCircleFill } from "react-icons/bs";

type ChatInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: () => void;
};

export const ChatInput = ({
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
}: ChatInputProps) => {
  const buttonDisabled = value.length === 0;
  return (
    <div className="fixed bottom-10 w-3/5 max-w-2xl">
      <label className="flex flex-col gap-2">
        <span>{label}</span>
        <textarea
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) onSubmit();
          }}
          className="w-full px-4 py-3 border rounded-2xl resize-none"
        />
      </label>
      <button
        type="button"
        onClick={onSubmit}
        disabled={buttonDisabled}
        className="absolute bottom-2 right-2 p-0.5 rounded-full focus:ring-2"
      >
        {buttonDisabled ? (
          <BsArrowUpCircle size={22} />
        ) : (
          <BsArrowUpCircleFill size={22} />
        )}
      </button>
    </div>
  );
};

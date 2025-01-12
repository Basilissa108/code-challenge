const sharedClasses =
  "w-2 h-2 my-0.5 mx-1 rounded-full bg-gray-300 animate-[loading_.6s_infinite_alternate]";

export const LoadingIndicator = () => (
  <div className="flex justify-center">
    <div className={`${sharedClasses}`} />
    <div className={`${sharedClasses} [animation-delay:0.2s]`} />
    <div className={`${sharedClasses} [animation-delay:0.4s]`} />
  </div>
);

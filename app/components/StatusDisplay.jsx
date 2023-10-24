const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    let color = "bg-slate-700";

    switch (status.toLowerCase()) {
      case "done":
        color = "bg-yellow-400";
        return color;
      case "started":
        color = "bg-orange-400";
        return color;
      case "not started":
        color = "bg-purple-400";
        return color;
        l;
    }
    return color;
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-800 uppercase ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;

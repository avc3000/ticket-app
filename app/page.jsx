import TicketCard from "./components/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-4">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-mono">{uniqueCategory}</h3>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      key={_index}
                      id={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

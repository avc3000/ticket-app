"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const EDIT_MODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDIT_MODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDIT_MODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        contentType: "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to update Ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        contentType: "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col xl:w-1/2 md:w-full bg-slate-950 mt-3"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-orange-500 font-mono">
          {EDIT_MODE ? "Update Ticket" : "Create Ticket"}
        </h3>
        <label>Ticket</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div className="flex justify-between">
          <div>
            <input
              type="radio"
              id="priority-1"
              name="priority"
              onChange={handleChange}
              checked={formData.priority == 1}
              value={1}
            />
            <label className="ml-2">1</label>
          </div>
          <div>
            <input
              type="radio"
              id="priority-2"
              name="priority"
              onChange={handleChange}
              checked={formData.priority == 2}
              value={2}
            />
            <label className="ml-2">2</label>
          </div>
          <div>
            <input
              type="radio"
              id="priority-3"
              name="priority"
              onChange={handleChange}
              checked={formData.priority == 3}
              value={3}
            />
            <label className="ml-2">3</label>
          </div>
          <div>
            <input
              type="radio"
              id="priority-4"
              name="priority"
              onChange={handleChange}
              checked={formData.priority == 4}
              value={4}
            />
            <label className="ml-2">4</label>
          </div>
          <div>
            <input
              type="radio"
              id="priority-5"
              name="priority"
              onChange={handleChange}
              checked={formData.priority == 5}
              value={5}
            />
            <label className="ml-2">5</label>
          </div>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          onChange={handleChange}
          value={formData.progress}
          min={0}
          max={100}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDIT_MODE ? "Update" : "Create"}
        />
      </form>
    </div>
  );
};

export default TicketForm;

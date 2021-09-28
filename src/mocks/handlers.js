import { rest } from "msw";
import { API_URL } from "../App";

export const handlers = [
  rest.get(`${API_URL}/todos`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "5fe3f4ca-193c-4170-83c1-cb5a19908601",
          title: "Buy food for dinner",
          completed: false,
        },
        {
          id: "f619466c-a016-4281-b584-7db2795d103d",
          title: "Call Marie at 10.00 PM",
          completed: false,
        },
        {
          id: "5fe3f4ca-193c-4170-83c1-cb5a19908602",
          title: "Write a react blog post",
          completed: false,
        },
      ])
    );
  }),
  rest.post(`${API_URL}/todos`, (req, res, ctx) => {
    const { title, completed } = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        id: "a619466c-a016-4281-b584-7db2795d123e",
        title,
        completed,
      })
    );
  }),
  // complete a todo and edit a todo title
  rest.patch(`${API_URL}/todos/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        id: id,
        title: title || "Buy food for dinner",
        completed: completed || false,
      })
    );
  }),
  rest.delete(`${API_URL}/todos/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

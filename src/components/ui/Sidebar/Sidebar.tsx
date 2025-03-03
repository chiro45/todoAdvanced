import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { IconBook, IconListCheck } from "@tabler/icons-react";

const items = [
  { route: "/", text: "Backlog", icons: "books" },
  { route: "/sprints", text: "Sprints", icons: "list" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.containerSidebar}>
      <ul className={styles.containerListSidebar}>
        {items.map((el, index) => (
          <li
            key={index}
            onClick={() => {
              navigate(el.route);
            }}
            className={`${
              location.pathname === el.route ? styles.itemSidebarActive : ""
            } ${styles.itemsSidebar}`}
          >
            {el.text}
            {el.icons === "books" ? (
              <IconBook stroke={2} />
            ) : (
              <IconListCheck stroke={2} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

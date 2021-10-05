import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { Container, InputContainer, TasksContainer } from "./styles";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard({ authenticated }) {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const [user] = useState(
    JSON.parse(localStorage.getItem("@Doit:user")) || "{}"
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function loadTasks() {
    api
      .get(`/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
          userId: user.id,
        },
      })
      .then((response) => {
        const apiTasks = response.data.map((task) => {
          return {
            ...task,
            created_at: new Date(task.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          };
        });

        setTasks(apiTasks);
      });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar a tarefa");
    }

    const data = {
      description: task,
      userId: user.id,
      completed: false,
      created_at: new Date(),
    };
    api
      .post("/tasks", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const formattedData = {
          ...response.data,
          created_at: new Date(response.data.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        };

        setTasks([...tasks, formattedData]);
      });
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    api
      .patch(
        `/tasks/${id}`,
        { completed: true, userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setTasks(newTasks));
  };

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>{new Date().toLocaleDateString("pt-BR")}</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tarefa"
            register={register}
            name="task"
            error={errors.task?.message}
          />
          <Button type="submit"> Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map((task) => (
          <Card
            key={task.id}
            title={task.description}
            date={task.created_at}
            onClick={() => handleCompleted(task.id)}
          />
        ))}
      </TasksContainer>
    </Container>
  );
}

export default Dashboard;

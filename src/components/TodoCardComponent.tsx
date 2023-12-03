import EditableCard from "./ui/Card/EditableCard";
import NotStartedCard from "./ui/Card/NotStartedCard";
import OnProgressCard from "./ui/Card/OnProgressCard";
import IsCompletedCard from "./ui/Card/IsCompletedCard";
import { type SubTask } from "@prisma/client";

interface TodoProps {
  id: number;
  title: string;
  detail: string | null;
  isCompleted: boolean;
  imageData: string;
  totalMinutes: number | null;
  remainingMinutes: number | null;
  isEditable: boolean;
  enterEditMode: (id: number | null) => void; // 追加
  subTasks: SubTask[];
}

export default function TodoCardComponent({
  id,
  title,
  detail,
  isCompleted,
  imageData,
  isEditable,
  enterEditMode,
  totalMinutes,
  remainingMinutes,
  subTasks,
}: TodoProps) {
  const remainingMinutesorZero = remainingMinutes ? remainingMinutes : 0;

  if (isEditable) {
    return (
      <EditableCard
        title={title}
        detail={detail}
        id={id}
        imageData={imageData}
        enterEditMode={enterEditMode}
      />
    );
  } else if (!isCompleted && totalMinutes === null) {
    return (
      <NotStartedCard
        title={title}
        detail={detail}
        id={id}
        imageData={imageData}
        enterEditMode={enterEditMode}
      />
    );
  } else if (!isCompleted && totalMinutes !== null) {
    return (
      <OnProgressCard
        title={title}
        detail={detail}
        id={id}
        imageData={imageData}
        enterEditMode={enterEditMode}
        totalMinutes={totalMinutes}
        remainingMinutes={remainingMinutesorZero}
        subTasks={subTasks}
      />
    );
  } else if (isCompleted) {
    return (
      <IsCompletedCard
        title={title}
        detail={detail}
        id={id}
        imageData={imageData}
        enterEditMode={enterEditMode}
      />
    );
  }
}

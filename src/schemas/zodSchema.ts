import { z } from "zod";

export const PublishUpdateSchema = z.object({
  isPublished: z.boolean(),
  isCompleted:z.boolean(),
  
  publishedTitle: z.string(),
  publishedStrategy: z.string(),
});

export const ContentUpdateSchema = z.object({
  title: z.string(),
  detail: z.string().optional(),
});

export const TotalTimeUpdateSchema = z.object({
  totalMinutes:z.number(),
  isOnGoing: z.boolean(),
});

export const RemainingTimeUpdateSchema = z.object({
  remainingMinutes: z.number(),
  isOnGoing: z.boolean(),
});




// 数値が自然数かどうかをチェックするカスタムバリデーション
const naturalNumber = z.number().min(1, "1以上の数値を入力してください。");

const subTaskEstimatedMinutesValidation = z.union([
  // 文字列の場合のバリデーション
  z.string()
    .refine(value => !isNaN(Number(value)), {
      message: "有効な数値を入力してください。",
    })
    .refine(value => Number(value) > 0, {
      message: "1以上の整数を入力してください。",
    }),

  // 数値の場合のバリデーション
  naturalNumber
]);
  

export const subTaskValidation = z.object({
  subTasks: z.array(
    z.object({
      subTaskTitle: z.string().min(1,"必須項目です。"),
      estimatedMinutes: subTaskEstimatedMinutesValidation,
    })
  ),
});


export const taskValidation = z.object({
  title: z.string().min(1,"タスクの名前は必須項目です。"),
  detail: z.string().optional(),
})


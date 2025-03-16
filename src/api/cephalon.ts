import instance from "../api";

interface CreateCephalonAppResponse {
  body: string;
  call_back_url: string;
  result: string;
  state: string;
  type: string;
  id: string;
}

interface CreateCephalonAppRequest {
  "Hmac-Key"?: string;
  Hmac?: string;
  type: string;
  body: string;
  gpu_version?: string;
  inner_uri?: string;
  inner_method?: string;
}

// 创建端脑云应用
export function createCephalonApp(
  options: CreateCephalonAppRequest
): Promise<CreateCephalonAppResponse> {
  console.log(options);
  return instance.post(
    "https://cephalon.cloud/dispatcher/sd/v1/missions",
    options,
    {
      headers: {
        "Hmac-Key": "0f2c43bfdb35d5c8a6d8e634b1dc47c2",
        Hmac: "3d970406433ff8eeb01733da379bd03652562e7f4ed5f9f834255b547f15022f",
      },
    }
  );
}

// 获取端脑云应用状态
interface GetAppStatusResponse {
  body: string;
  call_back_url: string;
  result_urls: Array<string>;
  state: string;
  type: string;
  id: string;
}

export function getCephalonAppStatus(
  id: string
): Promise<GetAppStatusResponse> {
  return instance.get(
    `https://cephalon.cloud/dispatcher/sd/v1/missions/${id}`,
    {
      headers: {
        "Hmac-Key": "0f2c43bfdb35d5c8a6d8e634b1dc47c2",
        Hmac: "3d970406433ff8eeb01733da379bd03652562e7f4ed5f9f834255b547f15022f",
      },
    }
  );
}

// 调用Flux模型接口
interface FluxModelRequest {
  prompt: string;
  height: number;
  width: number;
  steps: number;
  guidance_scale: number;
}

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJbmZvIjoiYXBpOjE4OTI2MDA5OTY5NTcwOTc5ODQiLCJleHAiOjE3NzM1Njg0NDN9.o2M2_SIReT7FlFh9Zu3MaxIasodWARg7jaqE-2FPdSM";

export function getFluxModel(options: FluxModelRequest) {
  return instance.post("/aicg/user-center/v1/model/comfyui", options, {
    headers: {
      Authorization: apiKey,
      "Model-Id": 1854732937730371541,
    },
  });
}

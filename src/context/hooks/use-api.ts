"use client"

import axios from "axios";
import { useMemo } from "react";


export function useApi({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_BACKEND_API_KEY;

  const api = useMemo(() => {
    if (!baseURL) {
      throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
    }

    return axios.create({
      baseURL,
      headers: {
        'x-api-key': apiKey,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
  }, [accessToken, baseURL, apiKey]);

  return {
    api
  }
}
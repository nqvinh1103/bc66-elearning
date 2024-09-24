import { useAuth } from 'hooks';
import React from 'react';
export const AccountHistoryRegister = () => {
  const {user} = useAuth();
  return (
    <>
    {user.chiTietKhoaHocGhiDanh.length > 0 &&
      <div>AccountHistoryRegister</div>
    }
    </>
  )
}

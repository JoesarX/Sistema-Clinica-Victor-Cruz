import React from 'react';
import { useNavigate } from 'react-router-dom';

const PermissionChecker = ({ userType, requiredPermissions, allowSpecialPermission, children }) => {
  const navigate = useNavigate();

  const requiredPermissionsArray = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  const hasPermission = requiredPermissionsArray.includes(userType);

  if (userType === 'normal' && allowSpecialPermission === 'specialPermission') {
    return children;
  }

  if (!hasPermission) {
    navigate('/prohibido');
    return null;
  }

  return children;
};

export default PermissionChecker;

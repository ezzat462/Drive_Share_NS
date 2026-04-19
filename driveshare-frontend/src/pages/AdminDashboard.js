import { useState, useEffect } from "react";
import adminService from "../services/adminService";

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingCars, setPendingCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend base URL for images
  const API_URL = "http://localhost:5243";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userRes = await adminService.getPendingUsers();
      const carRes = await adminService.getPendingCars();
      if (userRes.success) setPendingUsers(userRes.data);
      if (carRes.success) setPendingCars(carRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (id) => {
    const res = await adminService.approveUser(id);
    if (res.success) {
      setPendingUsers(pendingUsers.filter(u => u.id !== id));
    }
  };

  const handleApproveCar = async (id) => {
    const res = await adminService.approveCar(id);
    if (res.success) {
      setPendingCars(pendingCars.filter(c => c.id !== id));
    }
  };

  // 1. ADD: Handle Reject Car logic
  const handleRejectCar = async (id) => {
    if (window.confirm("Are you sure you want to REJECT and DELETE this car post?")) {
      const res = await adminService.rejectCar(id);
      if (res.success) {
        setPendingCars(pendingCars.filter(c => c.id !== id));
      }
    }
  };

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-5 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
         <h2 className="fw-bold border-start border-primary border-4 ps-3">Admin Management Hub</h2>
         <span className="badge bg-primary rounded-pill px-3 py-2">System Administrator</span>
      </div>

      <div className="row g-4">
        {/* Pending Licenses */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3">
              <h5 className="m-0 fw-bold"><i className="bi bi-person-badge-fill me-2"></i>Pending Licenses</h5>
            </div>
            <div className="card-body p-0">
              {pendingUsers.length === 0 ? (
                <div className="text-center py-5 text-muted">No pending license verifications.</div>
              ) : (
                <div className="list-group list-group-flush">
                  {pendingUsers.map(user => (
                    <div key={user.id} className="list-group-item p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>{user.fullName}</strong>
                        <span className="badge bg-warning text-dark">Pending</span>
                      </div>
                      <p className="small text-muted mb-3">{user.email}</p>
                      <div className="d-flex gap-2">
                        <a href={`${API_URL}${user.licenseImageUrl}`} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm rounded-pill px-3">View Document</a>
                        <button className="btn btn-success btn-sm rounded-pill px-3" onClick={() => handleApproveUser(user.id)}>Approve</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pending Cars */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3">
              <h5 className="m-0 fw-bold"><i className="bi bi-car-front-fill me-2"></i>Pending Car Listings</h5>
            </div>
            <div className="card-body p-0">
              {pendingCars.length === 0 ? (
                <div className="text-center py-5 text-muted">All cars have been reviewed. Good job!</div>
              ) : (
                <div className="list-group list-group-flush">
                  {pendingCars.map(car => (
                    <div key={car.id} className="list-group-item p-3">
                      <div className="d-flex gap-3 align-items-center">
                        {/* 2. ADD: Car Image Preview */}
                        <div className="car-preview flex-shrink-0">
                          <img 
                            src={car.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"} 
                            alt={car.brand} 
                            className="rounded-3 shadow-sm border"
                            style={{ width: "100px", height: "70px", objectFit: "cover" }}
                          />
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-1 fw-bold">{car.brand} {car.model} ({car.year})</h6>
                            <span className="text-primary fw-bold">${car.pricePerDay}/day</span>
                          </div>
                          <p className="small text-muted mb-0">Owner: {car.ownerName} | Location: {car.location}</p>
                        </div>
                        
                        <div className="d-flex flex-column gap-2 ms-auto">
                          <button className="btn btn-success btn-sm rounded-pill px-3" onClick={() => handleApproveCar(car.id)}>Approve</button>
                          
                          {/* 3. ADD: Reject Button (Styled Red) */}
                          <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => handleRejectCar(car.id)}>Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

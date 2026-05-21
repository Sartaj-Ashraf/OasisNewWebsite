"use client";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { 
  Eye, 
  EyeOff, 
  Trash2, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  Maximize2,
  Calendar,
  Layers
} from "lucide-react";

import {
  deleteContactApi,
  getContactsApi,
  toggleReadStatusApi,
} from "@/services/contact.service";
import { DeleteModal } from "@/components/admin/DeleteModal";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination, Filtering & Inspection States
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [expandedContactId, setExpandedContactId] = useState(null);
  
  // Dedicated View Overlay Modal State
  const [viewingContact, setViewingContact] = useState(null);

  // Modal State Tree
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      let isReadParam = undefined;
      if (statusFilter === "read") isReadParam = true;
      if (statusFilter === "unread") isReadParam = false;

      const data = await getContactsApi({
        page,
        limit: 10,
        isRead: isReadParam,
      });
      
      setContacts(data.data.contacts || []);
      setPagination(data.data.pagination || { page: 1, totalPages: 1 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync contact records.");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleFilterChange = (newFilterValue) => {
    setStatusFilter(newFilterValue);
    setPage(1);
    setExpandedContactId(null); 
  };

  const toggleExpandRow = (id) => {
    setExpandedContactId(expandedContactId === id ? null : id);
  };

  const openDeleteModal = (e, contact) => {
    e.stopPropagation(); 
    setSelectedContact(contact);
    setIsDeleteOpen(true);
  };

  const handleOpenViewModal = (e, contact) => {
    e.stopPropagation();
    setViewingContact(contact);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedContact) return;
    const toastId = toast.loading("Processing entry removal...");
    try {
      await deleteContactApi(selectedContact._id);
      setContacts((prev) => prev.filter((item) => item._id !== selectedContact._id));
      toast.success("Query deleted successfully", { id: toastId });
      setIsDeleteOpen(false);
      setSelectedContact(null);
      
      if (contacts.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchContacts();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete contact query.", { id: toastId });
    }
  };

  const handleToggleRead = async (e, id, currentStatus) => {
    e.stopPropagation(); 
    setContacts((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isRead: !currentStatus } : item
      )
    );

    try {
      const response = await toggleReadStatusApi(id);
      setContacts((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      toast.success(`Marked as ${!currentStatus ? "Read" : "Unread"}`);
      
      if (statusFilter !== "all") {
        fetchContacts();
      }
    } catch (error) {
      console.error(error);
      setContacts((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: currentStatus } : item
        )
      );
      toast.error("Failed to alter read flag status.");
    }
  };

  return (
   <div className="p-6 max-w-7xl mx-auto space-y-6 text-text-primary">
  {/* Header Panel Layout */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl! font-bold tracking-tight text-primary">Contact Queries</h1>
      <p className="text-md! text-text-secondary mt-0.5">Manage user form submissions and feedback pipelines.</p>
    </div>

    {/* Tab Filter Control Stack */}
    <div className="flex items-center gap-1 bg-accent/60 p-1 rounded-xl">
      <button
        onClick={() => handleFilterChange("all")}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
          statusFilter === "all"
            ? "bg-secondary text-text-light shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-accent/40"
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange("read")}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
          statusFilter === "read"
            ? "bg-secondary text-text-light shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-accent/40"
        }`}
      >
        Read
      </button>
      <button
        onClick={() => handleFilterChange("unread")}
        className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
          statusFilter === "unread"
            ? "bg-secondary text-text-light shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-accent/40"
        }`}
      >
        Unread
      </button>
    </div>
  </div>

  {/* Modern Borderless Table Interface Container */}
  <div className="bg-accent-light rounded-2xl shadow-sm overflow-hidden border-none">
    <div className="overflow-x-auto custom-scroll">
      <table className="w-full text-sm text-left border-none border-collapse">
        <thead className="bg-accent/40 text-text-secondary font-semibold text-xs uppercase tracking-wider border-none">
          <tr className="border-none">
            <th className="py-4 px-5 border-none"><span className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-text-secondary opacity-70" /> Name</span></th>
            <th className="py-4 px-5 border-none"><span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-text-secondary opacity-70" /> Email</span></th>
            <th className="py-4 px-5 border-none"><span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-text-secondary opacity-70" /> Phone</span></th>
            <th className="py-4 px-5 w-1/3 min-w-[260px] border-none"><span className="flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5 text-text-secondary opacity-70" /> Message Snippet</span></th>
            <th className="py-4 px-5 border-none">Status</th>
            <th className="py-4 px-5 text-right border-none">Actions</th>
          </tr>
        </thead>

        <tbody className="text-text-primary border-none">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="animate-pulse bg-transparent border-none">
                <td className="py-4 px-5 border-none"><div className="h-4 bg-accent rounded w-24"></div></td>
                <td className="py-4 px-5 border-none"><div className="h-4 bg-accent rounded w-36"></div></td>
                <td className="py-4 px-5 border-none"><div className="h-4 bg-accent rounded w-28"></div></td>
                <td className="py-4 px-5 border-none"><div className="h-4 bg-accent rounded w-full"></div></td>
                <td className="py-4 px-5 border-none"><div className="h-5 bg-accent rounded-full w-14"></div></td>
                <td className="py-4 px-5 text-right border-none"><div className="h-8 bg-accent rounded w-16 ml-auto"></div></td>
              </tr>
            ))
          ) : contacts.length === 0 ? (
            <tr className="border-none">
              <td colSpan="6" className="py-16 text-center text-text-secondary italic bg-transparent border-none">
                No active queries found matching this filter layout view.
              </td>
            </tr>
          ) : (
            contacts.map((contact) => {
              const isExpanded = expandedContactId === contact._id;
              return (
                <tr key={contact._id} className="display-table-row border-none">
                  <td colSpan="6" className="p-0 border-none">
                    <table className="w-full text-sm text-left border-none border-collapse">
                      <tbody className="border-none">
                        {/* Main Dynamic Data Row */}
                        <tr 
                          onClick={() => toggleExpandRow(contact._id)}
                          className={`cursor-pointer transition-colors border-none ${
                            isExpanded ? "bg-accent/40" : "hover:bg-accent/20"
                          }`}
                        >
                          <td className="py-4 px-5 font-medium border-none text-text-primary whitespace-nowrap">{contact.fullName}</td>
                          <td className="py-4 px-5 text-text-secondary border-none whitespace-nowrap">{contact.email}</td>
                          <td className="py-4 px-5 text-text-secondary border-none whitespace-nowrap">{contact.phoneNumber || "—"}</td>
                          <td className="py-4 px-5 text-text-secondary border-none">
                            <span className="line-clamp-1 text-sm max-w-[300px] md:max-w-none">{contact.message}</span>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap border-none">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${
                                contact.isRead
                                  ? "bg-secondary-muted/20 text-secondary border border-secondary/20"
                                  : "bg-primary/10 text-primary-dark border border-primary/20"
                              }`}
                            >
                              {contact.isRead ? "Read" : "Unread"}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap border-none">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => handleOpenViewModal(e, contact)}
                                title="View full workspace overview"
                                className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-accent/80 rounded-lg transition-all"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleToggleRead(e, contact._id, contact.isRead)}
                                title={contact.isRead ? "Mark as unread" : "Mark as read"}
                                className={`p-1.5 rounded-lg transition-all ${
                                  contact.isRead
                                    ? "text-text-secondary hover:bg-accent/80"
                                    : "bg-primary/10 hover:bg-primary/20 text-primary-dark"
                                }`}
                              >
                                {contact.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={(e) => openDeleteModal(e, contact)}
                                title="Delete query data record"
                                className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <span className="text-text-secondary/40 pl-1">
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {/* Dropdown Expanded Message Inspector Panel */}
                        {isExpanded && (
                          <tr className="bg-accent/20 border-none">
                            <td colSpan="6" className="py-4 px-6 border-none">
                              <div className="bg-accent-light p-4 rounded-xl space-y-3 shadow-inner border border-border/50">
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-secondary border-b border-accent pb-2">
                                  <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-text-secondary opacity-60" /> <span className="font-semibold text-text-primary">Sender:</span> {contact.fullName}</div>
                                  <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-text-secondary opacity-60" /> <span className="font-semibold text-text-primary">Email:</span> {contact.email}</div>
                                  <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-text-secondary opacity-60" /> <span className="font-semibold text-text-primary">Phone:</span> {contact.phoneNumber || "—"}</div>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">Full Submission Message:</span>
                                  <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-sans">
                                    {contact.message}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>

    {/* Custom Seamless Pagination Bar */}
    {!loading && contacts.length > 0 && (
      <div className="flex items-center justify-between p-4 bg-accent/30 border-none">
        <span className="text-xs text-text-secondary font-medium">
          Page <span className="text-text-primary font-bold">{pagination.page}</span> of{" "}
          <span className="text-text-primary font-bold">{pagination.totalPages || 1}</span>
        </span>
        <div className="flex gap-1.5">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent-light text-text-primary shadow-sm hover:bg-accent disabled:opacity-40 disabled:pointer-events-none transition-colors border border-border/40"
          >
            Previous
          </button>
          <button
            disabled={page >= (pagination.totalPages || 1)}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent-light text-text-primary shadow-sm hover:bg-accent disabled:opacity-40 disabled:pointer-events-none transition-colors border border-border/40"
          >
            Next
          </button>
        </div>
      </div>
    )}
  </div>

  {/* Confirmation Asset Deletion Component Drawer Layer */}
  <DeleteModal
    isOpen={isDeleteOpen}
    onClose={() => {
      setIsDeleteOpen(false);
      setSelectedContact(null);
    }}
    onConfirm={handleDeleteConfirm}
    title={selectedContact ? `${selectedContact.fullName}'s submitted inquiry` : "this data log"}
  />

  {/* Premium Seamless Entry Full Screen Inspector Layer Modal */}
  {viewingContact && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl! bg-accent-light rounded-2xl shadow-xl overflow-hidden text-text-primary p-6 space-y-6 border border-border/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-accent pb-4">
          <div>
            <h2 className="text-xl! font-bold tracking-tight text-text-primary">{viewingContact.fullName}</h2>
            <p className="text-sm! text-text-secondary mt-1">Detailed form submission breakdown</p>
          </div>
          <button 
            onClick={() => setViewingContact(null)}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-accent rounded-lg transition-all text-xs font-medium"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-text-secondary">
              <User className="w-4 h-4 text-text-secondary opacity-70" />
              <div>
                <span className="text-xs! text-secondary block font-semibold uppercase tracking-wider">Full Name</span>
                <span className="text-primary font-medium">{viewingContact.fullName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-secondary">
              <Mail className="w-4 h-4 text-secondary opacity-70" />
              <div>
                <span className="text-xs! text-secondary block font-semibold uppercase tracking-wider">Email Address</span>
                <a href={`mailto:${viewingContact.email}`} className="text-secondary hover:text-secondary-light hover:underline font-medium">{viewingContact.email}</a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-secondary">
              <Phone className="w-4 h-4 text-secondary opacity-70" />
              <div>
                <span className="text-xs! text-secondary block font-semibold uppercase tracking-wider">Phone Number</span>
                <span className="text-primary font-medium">{viewingContact.phoneNumber || "—"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-secondary">
              <Layers className="w-4 h-4 text-secondary opacity-70" />
              <div>
                <span className="text-xs! text-secondary block font-semibold uppercase tracking-wider">Processing Status</span>
                <span className={`inline-flex items-center mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide border ${
                  viewingContact.isRead 
                    ? "bg-secondary-muted/20 text-secondary border-secondary/20" 
                    : "bg-primary/10 text-primary-dark border-primary/20"
                }`}>
                  {viewingContact.isRead ? "Reviewed" : "Pending Actions"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/40 p-4 rounded-xl space-y-1 shadow-inner border border-border/30">
          <span className="text-sm! font-bold text-secondary uppercase tracking-wider block">Submitted Message Content:</span>
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-sans max-h-60 overflow-y-auto custom-scroll pr-1">
            {viewingContact.message}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-accent">
          <button
            onClick={(e) => {
              handleToggleRead(e, viewingContact._id, viewingContact.isRead);
              setViewingContact(prev => ({ ...prev, isRead: !prev.isRead }));
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
              viewingContact.isRead
                ? "border-border text-text-secondary hover:bg-accent"
                : "bg-primary text-text-primary shadow-sm hover:bg-primary-dark border-transparent"
            }`}
          >
            {viewingContact.isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
          <button
            onClick={(e) => {
              openDeleteModal(e, viewingContact);
              setViewingContact(null);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-sm transition-all border-transparent"
          >
            Delete Record
          </button>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default ContactsPage;
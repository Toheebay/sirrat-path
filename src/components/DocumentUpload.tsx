
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Download,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentUpload = () => {
  const [documents] = useState([
    {
      id: 1,
      name: "International Passport",
      description: "Valid passport with at least 6 months validity",
      status: "approved",
      uploadDate: "2024-01-15",
      expiryDate: "2026-08-20",
      required: true,
      fileSize: "2.3 MB"
    },
    {
      id: 2,
      name: "Passport Photograph",
      description: "Recent passport-sized photograph (white background)",
      status: "approved",
      uploadDate: "2024-01-15",
      required: true,
      fileSize: "1.1 MB"
    },
    {
      id: 3,
      name: "Vaccination Certificate",
      description: "Yellow fever and other required vaccines",
      status: "pending",
      uploadDate: "2024-01-16",
      required: true,
      fileSize: "0.8 MB"
    },
    {
      id: 4,
      name: "NIN Certificate",
      description: "National Identity Number certificate",
      status: "approved",
      uploadDate: "2024-01-15",
      required: true,
      fileSize: "1.5 MB"
    },
    {
      id: 5,
      name: "Medical Report",
      description: "Health certificate from recognized hospital",
      status: "rejected",
      uploadDate: "2024-01-14",
      required: false,
      fileSize: "3.2 MB",
      rejectionReason: "Document unclear, please upload a clearer version"
    },
    {
      id: 6,
      name: "Guarantor's Letter",
      description: "Letter from guarantor with attached ID",
      status: "missing",
      required: false
    }
  ]);

  const { toast } = useToast();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'approved':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: '✓ Approved' };
      case 'pending':
        return { color: 'bg-orange-100 text-orange-800', icon: AlertCircle, label: '⏳ Under Review' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: '✗ Rejected' };
      case 'missing':
        return { color: 'bg-gray-100 text-gray-800', icon: Upload, label: '📤 Upload Required' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: FileText, label: 'Unknown' };
    }
  };

  const approvedCount = documents.filter(doc => doc.status === 'approved').length;
  const totalRequired = documents.filter(doc => doc.required).length;
  const completionPercentage = (approvedCount / documents.length) * 100;

  const handleUpload = (docId: number) => {
    toast({
      title: "Upload Started",
      description: "Your document is being uploaded...",
    });
  };

  const handleView = (docName: string) => {
    toast({
      title: "Document Viewer",
      description: `Opening ${docName}...`,
    });
  };

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${docName}...`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-purple-100 text-purple-800">
          📄 Document Center
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Document Management</h1>
        <p className="text-gray-600">Upload and manage your Hajj application documents</p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Approved</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Under Review</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'pending').length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Rejected</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'rejected').length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-100 text-sm">Missing</p>
                <p className="text-2xl font-bold">{documents.filter(d => d.status === 'missing').length}</p>
              </div>
              <Upload className="w-8 h-8 text-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completion Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Document Completion Progress</span>
          </CardTitle>
          <CardDescription>
            {approvedCount} of {documents.length} documents completed ({Math.round(completionPercentage)}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3 mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{approvedCount} documents approved</span>
            <span>{documents.length - approvedCount} documents remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {documents.map((doc) => {
          const statusInfo = getStatusInfo(doc.status);
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={doc.id} className={`hover:shadow-lg transition-all duration-300 ${
              doc.status === 'rejected' ? 'border-red-200 bg-red-50/30' :
              doc.status === 'approved' ? 'border-green-200 bg-green-50/30' :
              doc.status === 'pending' ? 'border-orange-200 bg-orange-50/30' :
              'border-gray-200'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span>{doc.name}</span>
                      {doc.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-1">{doc.description}</CardDescription>
                  </div>
                  <Badge className={statusInfo.color}>
                    {statusInfo.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Document Info */}
                {doc.status !== 'missing' && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        Uploaded: {new Date(doc.uploadDate!).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Size: {doc.fileSize}</span>
                    </div>
                    {doc.expiryDate && (
                      <div className="flex items-center space-x-2 col-span-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-600">
                          Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Rejection Reason */}
                {doc.status === 'rejected' && doc.rejectionReason && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                        <p className="text-sm text-red-700">{doc.rejectionReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {doc.status === 'missing' || doc.status === 'rejected' ? (
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700" 
                      onClick={() => handleUpload(doc.id)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {doc.status === 'missing' ? 'Upload Document' : 'Re-upload'}
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleView(doc.name)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownload(doc.name)}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleUpload(doc.id)}
                        className="flex-1"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Replace
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Document Requirements */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📋 Document Requirements & Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-emerald-800">✅ Upload Guidelines</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Documents must be clear and readable</li>
                <li>• Accepted formats: PDF, JPG, PNG</li>
                <li>• Maximum file size: 5MB per document</li>
                <li>• Ensure all text is visible and legible</li>
                <li>• Upload original documents, not photocopies when possible</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-800">⏰ Processing Timeline</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Document review: 2-3 business days</li>
                <li>• Approval notification via email/SMS</li>
                <li>• Resubmission required for rejected documents</li>
                <li>• Contact support for urgent processing</li>
                <li>• Final approval needed before travel</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;

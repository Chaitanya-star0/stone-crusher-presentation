// Professional Banking Presentation JavaScript - Fixed Version

class BankingPresentation {
    constructor() {
        this.currentSection = 'executive-dashboard';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTabs();
        this.setupPrintFunctionality();
        this.setupScrollEffects();
        this.setupDocumentTracking();
        this.setupAnimations();
        this.updateDocumentStatus();
        this.initializeCharts();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1); // Remove # from href
                this.showSection(targetId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Handle scroll-based navigation highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            this.currentSection = sectionId;
            
            // Scroll to top of section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active to clicked tab and corresponding content
                btn.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    setupPrintFunctionality() {
        const printBtn = document.querySelector('.print-btn');
        const downloadBtn = document.querySelector('.footer-actions .btn--primary');
        
        if (printBtn) {
            printBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPrintPreview();
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateReport();
            });
        }
    }

    showPrintPreview() {
        // Show all sections for printing
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.display = 'block';
        });
        
        // Add print-specific styles
        document.body.classList.add('printing');
        
        // Print the document
        setTimeout(() => {
            window.print();
            
            // Restore original view after printing
            setTimeout(() => {
                document.body.classList.remove('printing');
                sections.forEach(section => {
                    section.style.display = 'none';
                });
                // Show current section
                const currentSectionEl = document.getElementById(this.currentSection);
                if (currentSectionEl) {
                    currentSectionEl.style.display = 'block';
                }
            }, 1000);
        }, 500);
    }

    generateReport() {
        // Simulate report generation
        const btn = document.querySelector('.footer-actions .btn--primary');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Report Generated';
            
            // Simulate file download
            this.simulateFileDownload('Jeevan_Industries_Banking_Report.pdf');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 3000);
    }

    simulateFileDownload(filename) {
        // Create a temporary download link
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSAxIDAgUgo+Pgo+PgovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAxNAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjEwMCA3MDAgVGQKKEhlbGxvIFdvcmxkKSBUagpFVApzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI3NSAwMDAwMCBuIAowMDAwMDAwMzM5IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDE5CiUlRU9G';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.metric-card, .card, .chart-container, .project-card, .risk-item');
        animateElements.forEach(el => observer.observe(el));
    }

    setupDocumentTracking() {
        // Track document completion status
        const documentItems = document.querySelectorAll('.document-item');
        let completedCount = 0;
        let totalCount = documentItems.length;

        documentItems.forEach(item => {
            if (item.classList.contains('complete')) {
                completedCount++;
            }
            
            // Add click handlers for document items
            const viewBtn = item.querySelector('.btn');
            if (viewBtn && !viewBtn.disabled) {
                viewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleDocumentView(item);
                });
            }
        });

        // Update completion percentage
        const completionRate = Math.round((completedCount / totalCount) * 100);
        const completionElements = document.querySelectorAll('.total-stat h4');
        completionElements.forEach(el => {
            el.textContent = `${completionRate}%`;
        });
    }

    handleDocumentView(documentItem) {
        const documentName = documentItem.querySelector('span').textContent;
        
        // Simulate document viewing
        const modal = this.createDocumentModal(documentName);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    createDocumentModal(documentName) {
        const modal = document.createElement('div');
        modal.className = 'document-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-file-pdf"></i> ${documentName}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="document-preview">
                        <i class="fas fa-file-pdf document-icon"></i>
                        <p><strong>${documentName}</strong></p>
                        <p class="document-info">This document is available for review. In a production environment, this would display the actual PDF content or provide download functionality.</p>
                        <div class="document-metadata">
                            <div class="metadata-item">
                                <span class="label">Status:</span>
                                <span class="value status--success">Available</span>
                            </div>
                            <div class="metadata-item">
                                <span class="label">Size:</span>
                                <span class="value">2.3 MB</span>
                            </div>
                            <div class="metadata-item">
                                <span class="label">Last Updated:</span>
                                <span class="value">August 2025</span>
                            </div>
                        </div>
                    </div>
                    <div class="document-actions">
                        <button class="btn btn--primary download-btn">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="btn btn--outline view-btn">
                            <i class="fas fa-eye"></i> View Full Document
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add functionality to action buttons
        const downloadBtn = modal.querySelector('.download-btn');
        const viewBtn = modal.querySelector('.view-btn');
        
        downloadBtn.addEventListener('click', () => {
            this.simulateDocumentDownload(documentName);
        });
        
        viewBtn.addEventListener('click', () => {
            this.simulateDocumentView(documentName);
        });

        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        // Close on Escape key
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeyPress);
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        // Add modal styles if not already present
        this.addModalStyles();

        return modal;
    }

    simulateDocumentDownload(documentName) {
        const filename = documentName.replace(/\s+/g, '_') + '.pdf';
        this.simulateFileDownload(filename);
        
        // Show success message
        this.showNotification(`${documentName} downloaded successfully!`, 'success');
    }

    simulateDocumentView(documentName) {
        // Simulate opening document in new tab
        const newTab = window.open('', '_blank');
        newTab.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${documentName} - Jeevan Industries</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        background: #f5f5f5; 
                        padding: 20px; 
                        text-align: center;
                    }
                    .container { 
                        max-width: 800px; 
                        margin: 0 auto; 
                        background: white; 
                        padding: 40px; 
                        border-radius: 8px; 
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .pdf-icon { 
                        font-size: 4rem; 
                        color: #dc2626; 
                        margin-bottom: 20px; 
                    }
                </style>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <i class="fas fa-file-pdf pdf-icon"></i>
                    <h1>${documentName}</h1>
                    <p>This is a preview of the document. In a production environment, the actual PDF content would be displayed here.</p>
                    <p><strong>Document Type:</strong> PDF</p>
                    <p><strong>Company:</strong> M/s Jeevan Industries</p>
                    <p><strong>Project:</strong> Stone Crushing Plant Modernization</p>
                </div>
            </body>
            </html>
        `);
        newTab.document.close();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Add notification styles if not present
        this.addNotificationStyles();
    }

    addNotificationStyles() {
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--banking-bg-card);
                    border: 1px solid var(--banking-border);
                    border-radius: var(--radius-base);
                    padding: var(--space-16);
                    display: flex;
                    align-items: center;
                    gap: var(--space-8);
                    z-index: 1001;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                    min-width: 300px;
                }
                
                .notification.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .notification--success {
                    border-left: 4px solid var(--banking-success);
                }
                
                .notification--info {
                    border-left: 4px solid var(--banking-accent);
                }
                
                .notification i {
                    color: var(--banking-success);
                }
                
                .notification--info i {
                    color: var(--banking-accent);
                }
                
                .notification span {
                    color: var(--banking-text-light);
                    font-size: var(--font-size-sm);
                }
            `;
            document.head.appendChild(styles);
        }
    }

    addModalStyles() {
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .document-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .document-modal.show {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    cursor: pointer;
                }
                
                .modal-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--banking-bg-card);
                    border: 1px solid var(--banking-border);
                    border-radius: var(--radius-lg);
                    min-width: 500px;
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-20);
                    border-bottom: 1px solid var(--banking-border);
                    background: var(--banking-primary);
                }
                
                .modal-header h3 {
                    color: var(--banking-text-light);
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: var(--space-8);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    color: var(--banking-text-light);
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    padding: var(--space-8);
                    border-radius: var(--radius-base);
                    transition: background var(--duration-fast);
                }
                
                .modal-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .modal-body {
                    padding: var(--space-24);
                }
                
                .document-preview {
                    text-align: center;
                    padding: var(--space-32) var(--space-20);
                    background: rgba(59, 130, 246, 0.05);
                    border-radius: var(--radius-base);
                    margin-bottom: var(--space-20);
                }
                
                .document-icon {
                    font-size: 4rem;
                    color: var(--banking-error);
                    margin-bottom: var(--space-16);
                }
                
                .document-preview p {
                    color: var(--banking-text-light);
                    margin: var(--space-8) 0;
                }
                
                .document-info {
                    color: var(--banking-text-muted) !important;
                    font-size: var(--font-size-sm) !important;
                }
                
                .document-metadata {
                    display: grid;
                    gap: var(--space-8);
                    margin-top: var(--space-16);
                    text-align: left;
                }
                
                .metadata-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-8);
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: var(--radius-sm);
                }
                
                .metadata-item .label {
                    color: var(--banking-text-muted);
                    font-weight: var(--font-weight-medium);
                }
                
                .metadata-item .value {
                    color: var(--banking-text-light);
                    font-weight: var(--font-weight-medium);
                }
                
                .document-actions {
                    display: flex;
                    justify-content: center;
                    gap: var(--space-12);
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        min-width: auto;
                        width: 95vw;
                        margin: var(--space-20);
                    }
                    
                    .document-actions {
                        flex-direction: column;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    setupAnimations() {
        // Add CSS animation classes
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .metric-card,
            .card,
            .chart-container,
            .project-card,
            .risk-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .metric-card {
                transition-delay: 0.1s;
            }
            
            .metric-card:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .metric-card:nth-child(3) {
                transition-delay: 0.3s;
            }
            
            .metric-card:nth-child(4) {
                transition-delay: 0.4s;
            }
            
            .metric-card:nth-child(5) {
                transition-delay: 0.5s;
            }
            
            .metric-card:nth-child(6) {
                transition-delay: 0.6s;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .metric-card,
                .card,
                .chart-container,
                .project-card,
                .risk-item {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(animationStyles);
    }

    updateDocumentStatus() {
        // Simulate real-time document status updates (optional enhancement)
        const statusIndicator = document.querySelector('.document-status');
        const pendingItems = document.querySelectorAll('.document-item.pending');
        
        if (pendingItems.length === 0) {
            statusIndicator.innerHTML = `
                <span class="status status--success">
                    <i class="fas fa-check-circle"></i>
                    All Documents Complete
                </span>
            `;
        }
    }

    updateCompletionStats() {
        const documentItems = document.querySelectorAll('.document-item');
        const completedItems = document.querySelectorAll('.document-item.complete');
        const pendingItems = document.querySelectorAll('.document-item.pending');
        
        const completionRate = Math.round((completedItems.length / documentItems.length) * 100);
        
        // Update stats cards
        const completeStatElements = document.querySelectorAll('.complete-stat h4');
        const pendingStatElements = document.querySelectorAll('.pending-stat h4');
        const totalStatElements = document.querySelectorAll('.total-stat h4');
        
        completeStatElements.forEach(el => {
            el.textContent = completedItems.length;
        });
        
        pendingStatElements.forEach(el => {
            el.textContent = pendingItems.length;
        });
        
        totalStatElements.forEach(el => {
            el.textContent = `${completionRate}%`;
        });
    }

    // Initialize dynamic charts with real data
    async initializeCharts() {
        try {
            console.log('Initializing dynamic charts with real data...');
            
            // Initialize data processor
            const dataProcessor = new DataProcessor();
            
            // Wait for DOM to be ready
            setTimeout(async () => {
                try {
                    // Generate all charts
                    await dataProcessor.generateRevenueChart('plChart');
                    await dataProcessor.generateBalanceSheetChart('balanceSheetChart');
                    await dataProcessor.generateDSCRChart('dscrChart');
                    await dataProcessor.generateMachineryChart('machineryChart');
                    
                    // Update dashboard metrics
                    await dataProcessor.updateDashboardMetrics();
                    
                    console.log('✅ All charts initialized successfully with real data');
                } catch (error) {
                    console.error('Error initializing charts:', error);
                }
            }, 1000);
            
        } catch (error) {
            console.error('Failed to initialize charts:', error);
        }
    }
}

// Enhanced Financial Calculator
class FinancialCalculator {
    constructor() {
        this.demoMode = true;
    }

    calculateDSCR(ebitda, interestExpense, principalRepayment) {
        return ebitda / (interestExpense + principalRepayment);
    }

    calculateROE(netIncome, shareholdersEquity) {
        return (netIncome / shareholdersEquity) * 100;
    }

    calculateROA(netIncome, totalAssets) {
        return (netIncome / totalAssets) * 100;
    }

    calculateCurrentRatio(currentAssets, currentLiabilities) {
        return currentAssets / currentLiabilities;
    }

    calculateDebtEquityRatio(totalDebt, totalEquity) {
        return totalDebt / totalEquity;
    }
}

// Risk Assessment Manager
class RiskAssessment {
    constructor() {
        this.risks = [
            { name: 'Market Demand', probability: 'Low', impact: 'Medium', score: 2 },
            { name: 'Raw Material', probability: 'Medium', impact: 'High', score: 6 },
            { name: 'Competition', probability: 'Medium', impact: 'Medium', score: 4 },
            { name: 'Regulatory', probability: 'Low', impact: 'High', score: 3 },
            { name: 'Technical', probability: 'Low', impact: 'Medium', score: 2 }
        ];
    }

    calculateOverallRiskScore() {
        const totalScore = this.risks.reduce((sum, risk) => sum + risk.score, 0);
        const maxPossibleScore = this.risks.length * 9; // 9 is max (High * High)
        return (totalScore / maxPossibleScore) * 100;
    }

    getRiskLevel() {
        const score = this.calculateOverallRiskScore();
        if (score <= 30) return 'Low';
        if (score <= 60) return 'Medium';
        return 'High';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    const app = new BankingPresentation();
    
    // Initialize additional modules
    const calculator = new FinancialCalculator();
    const riskAssessment = new RiskAssessment();
    
    // Make modules globally available for debugging
    window.bankingApp = {
        app,
        calculator,
        riskAssessment
    };
    
    // Show executive dashboard by default, hide others
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    console.log('🏦 Banking Presentation System Initialized');
    console.log('📊 Financial modules loaded successfully');
    console.log('🔒 Risk assessment system active');
});

// Export for testing and external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BankingPresentation,
        FinancialCalculator,
        RiskAssessment
    };
}
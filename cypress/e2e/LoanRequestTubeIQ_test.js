/// <reference types="cypress" />

import { onAPI } from '../support/pageObjects/API';
import { Assert } from '../support/pageObjects/assertions';
import { onTubeIQAttachmentsView } from '../support/pageObjects/AttachmentsViewTubeIQ';
import { onTubeIQCommentsView } from '../support/pageObjects/CommentsViewTubeIQ';
import { onTubeIQHomePage } from '../support/pageObjects/HomePageTubeIQ';
import { onTubeIQInstanceView } from '../support/pageObjects/InstanceViewTubeIQ';
import { onTubeIQTasksPage } from '../support/pageObjects/TasksPageTubeIQ';

describe('Credit request TubeIQ test', () => {
  // before(() => {
  //   cy.clearDownloadsFolder();
  // });
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.goToTubeIQLoginPage();
    cy.validLoginTubeIQ();
    cy.keepUserSignedIn();
  });

  /*1. CREDIT DEPARTMENT HEAD
   * Processing the request in TubeIQ by the Credit Department Head
   * Description:
   * • Receives the request submitted via the portal ✔️
   * (status "Ready" | prerequisite: takes over the task by clicking the "Assign to me" button)
   * • Reviews the basic elements of the request and attached documentation ✔️
   * • Uploads the questionnaires for creating a credit file for the applicant (and potential guarantor (optional))✔️
   * • Assigns the request to the selected Credit advisor✔️
   * • Forwards the case for further processing (with the possibility of leaving comments on the task (optional))✔️
   */
  it('Processing the basic credit request with no guarantor in Tasks by the Credit Department Head', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForCreditCreditDptHead();
    Assert.checkTubeIQTasksListSearchResultsDptHead();
    onTubeIQTasksPage.selectLatestCreditRequestFromListAsDptHead();
    Assert.confirmSelectedTubeIQCreditRequestTaskDptHead();
    Assert.verifyTubeIQInstanceInputsDataLoadedDptHead();
    onTubeIQTasksPage.clickAssignToMeButton();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    Assert.verifyInstanceInputsEnabled();
    onTubeIQInstanceView.selectAdvisorTubeIQ();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyAttachmentsInTubeIQ(onTubeIQAttachmentsView.getMandatoryAttachments());
    onTubeIQTasksPage.navigateToCommentsTab();
    onTubeIQCommentsView.leaveGeneralCommentDptHead();
    Assert.verifyTubeIQComments(onTubeIQCommentsView.getCreditRequestCommentDptHead());
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /* 2. CREDIT ADVISOR
   * Initital request processing in TubeIQ by the Credit Advisor ✔️
   * Description:
   * • In the inbox, receives the task assigned to him/her by the Credit Department Head, the task is called
   * "Initial processing of requests" ✔️
   *    • The task has the status 'Ready', which is visible in the header of the task details window
   *    • In the header of the task card, in the task list on the left, the name of the user to whom the task is currently assigned
   *    is visible in the title ✔️
   *    • In the header of the task details window, in the meta data 'Definition', the name of the user to whom the task is currently
   *    assigned is visible ✔️
   * • Reviews the basic elements of the request: ✔️
   *    • Basic information about the applicant, details about the AOFI product, the requested amount, the period for which the credit is
   *    requested, installment number, currency, explanation of the request, information about the guarantor (if any) ✔️
   * • Reviews the submitted documentation in the 'Attached documents' section ✔️
   *    • Checks the completeness of the documentation (informative)
   * • Checks whether there is a conflict of interest (own in relation to the applicant) ✔️
   *    • Makes a decision: No (there is no conflict), clicks on the 'Confirm' button
   * • The request process moves to "Entering collateral, additional elements and creating a credit proposal" ✔️
   */
  it('Initial basic credit request Processing with no guarantor by the Credit advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForCreditCreditAdvisor();
    Assert.checkTubeIQTasksListSearchResultsCreditAdvisor();
    onTubeIQTasksPage.selectInitialProcessingRequestFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQCreditRequestTaskCreditAdvisor();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyAttachmentsInTubeIQ(onTubeIQAttachmentsView.getMandatoryAttachments());
    onTubeIQTasksPage.goToInstanceTab();
    Assert.verifyTubeIQInstanceInputsDataLoadedCreditAdvisor();
    Assert.verifyInstanceInputsEnabledCreditAdvisor();
    onTubeIQInstanceView.setInterestConflictToNo();
    Assert.verifyTubeIQConflictOfInterestsIsSet('Ne');
    onTubeIQInstanceView.clickApplicantExposureButton();
    Assert.verifyApplicantExposurePopupOpen();
    onTubeIQInstanceView.closePopUpTubeIQ();
    onTubeIQInstanceView.clickCustomerArrangementsButton();
    Assert.verifyCustomerArrangementsPopupOpen();
    onTubeIQInstanceView.closePopUpTubeIQ();
    onTubeIQInstanceView.clickCustomerInfoButton();
    Assert.verifyCustomerInfoPopupOpen();
    onTubeIQInstanceView.closePopUpTubeIQ();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /* 3. CREDIT ADVISOR
   * Entering collateral, additional elements and creating a credit proposal ✔️
   * Description:
   * • After successful initial processing (if there is no conflict of interest), the credit officer receives the
   * task: 'Enter collateral, additional elements and create a credit proposal' ✔️
   * • Enters the proposed collaterals. Choose YES for each type of collateral (NO is a default value): ✔️
   * • For each collateral where "YES" is selected: Credit advisor can enter a comment about the collateral (OPTIONAL - not mandatory) ✔️
   * • Entry of additional elements for the loan proposal: ✔️
   * • Decision on the existence of a guarantor: ✔️
   *    • There is NO guarantor (NO):
   * • Printing of the loan proposal: ✔️
   *    • Credit officer clicks the "Save and print" button:
   *      - The pop-up window is successfully displayed ✔️
   *      - The "Credit proposal" document is displayed ✔️
   *    • Clicks the 'Print' button
   *      - The document is generated in .docx (Word) format ✔️
   *      - Content of the credit proposal:
   *        - All previously entered elements ✔️
   *        - Data from the questionnaire (automatically copied) ✔️
   * • Signing and uploading the loan proposal
   *    • Uploads signed document to the system (by dragging or clicking) ✔️
   * • Completing the documentation ✔️
   *    • Checks whether all documentation is complete ✔️
   * • Clicks "Confirm" button on Instance view: ✔️
   *    • The task is not in the list anymore because there is NO pledge on the equipment OR a mortgage
   *    → The process SKIPS the legal sector and goes to "Review of legal opinion" ✔️
   */
  it('Entry of collateral, additional elements and creation of a credit proposal by the Credit advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForCollateralEntryCreditAdvisor();
    Assert.checkTubeIQTasksListSearchCollateralEntryCreditAdvisor();
    onTubeIQTasksPage.selectCollateralEntryFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQCollateralEntryTaskCreditAdvisor();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    onTubeIQInstanceView.fillInTheCollateralEntries();
    Assert.confirmTubeIQSaveAndPrintButtonExists();
    onTubeIQInstanceView.clickSaveAndPrintButton();
    onTubeIQInstanceView.printTubeIQInstanceDocuments();
    Assert.verifyCreditPropositionDownloaded();
    onTubeIQInstanceView.deleteAllCreditFileQuestionaireAttachments();
    onTubeIQInstanceView.attachSignedCreditProposalDocument();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyAttachmentsInTubeIQ(onTubeIQAttachmentsView.getMandatoryAttachments());
    onTubeIQTasksPage.navigateToInstanceTab();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /* 4. CREDIT ADVISOR
   * Successful preparation of the decision proposal
   * (without guarantor, mortgage or pledge of goods or equipment, and wiothout loan request credit splitting)
   * Description:
   * • The credit officer receives the task: "Preparation for making a proposal for a decision" ✔️
   * • Reviews the basic request data of selected task:
   *   • Basic data of the loan request ✔️
   *   • All previously entered information ✔️
   *   • Documentation ✔️
   * • Makes a decision on the separation of loans:  ✔️
   *   • Dropdown input: set 'NO'
   * • Clicks "Confirm" button  ✔️
   * • The process switches to the task "Decision proposal - credit officer"  ✔️
   */
  it('Successful preparation for drafting the proposed decision by the Credit advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForProposalDraftEntryCreditAdvisor();
    Assert.checkTubeIQTasksListSearchProposalDraftEntryCreditAdvisor();
    onTubeIQTasksPage.selectProposalDraftFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQProposalDraftTaskCreditAdvisor();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    onTubeIQInstanceView.reviewBasicDataOfProposal();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteCreditProposalDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    onTubeIQInstanceView.setLoanSplittingToNo();
    Assert.verifyTubeIQLoanSplittingIsSet('Ne');
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /* 5. CREDIT ADVISOR
   * Review of loan request's basic conditions by credit officer (Decision proposal - credit advisor)
   * Description:
   * • Navigate to sidebar on the left and select 'Inbox.' ✔️
   * • Within Inbox side menu, select 'Tasks - Show All' option ✔️
   * • In the inbox panel, use search filters and refine search options: ✔️
   *      Decision proposal - credit advisor (Kreditni Referent) ✔️
   * • Navigate to Attachments tab and click ✔️
   * • Check whether the documentation is complete✔️
   * • Navigate to the Instance tab and click ✔️
   * • Navigate to the "Is the documentation complete?" input field, click and set the option to "Da" (Yes). ✔️
   * • Set basic conditions from the drop-down lists and input fields ✔️
   * • Click the "Applicant Exposure" button at the bottom left of the page ✔️
   * • Click on the input line within the 'Applicant exposure' popup and Select the date: 03.02.2025 (February): ✔️
   * • Close the popup = The 'Applicant exposure' popup is successfully closed and the Instance panel view is successfully displayed  ✔️
   * • Click the "Save and print" button at the bottom right of the Instance view screen:  ✔️
   *     - The document download pop-up window is successfully displayed ✔️
   *     - The "Basic conditions" document is displayed within the pop-up window ✔️
   * • Click the 'Print' button within the pop-up window: ✔️
   *     - The document is successfully printed  ✔️
   * • Uploads signed document to the system (by dragging or clicking)
   * -----------
   * Postcondition:
   * Decides whether the process continues, based on the entered decision of whether the loan request documentation is complete or not:
   * 1. If the documentation is not complete, the process ends
   * 2. If the documentation is complete, the process continues and moves on to the task Verification of the proposal of the decision, which is done by the head of the sector
   * -----------
   * • Navigate to the 'Submit' button at the bottom of the Instance view page and click:  ✔️
   */

  it('Review of loan request basic conditions by credit advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForDecisionProposalEntryCreditAdvisor();
    Assert.checkTubeIQTasksListSearchDecisionProposalEntryCreditAdvisor();
    onTubeIQTasksPage.selectDecisionProposalFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQDecisionProposalTaskCreditAdvisor();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteCreditProposalDocumentation()
    );
    onTubeIQTasksPage.navigateToInstanceTab();
    onTubeIQInstanceView.setDocumentationCompleteToYes();
    onTubeIQInstanceView.setBasicConditionsForProposalDecision();
    onTubeIQInstanceView.clickApplicantExposureButton();
    Assert.verifyApplicantExposurePopupOpen();
    onTubeIQInstanceView.selectDateInExposurePopUp();
    onTubeIQInstanceView.clickGetDataInExposurePopUp();
    onTubeIQInstanceView.closePopUpTubeIQ();
    Assert.confirmInstancePageIsLoaded();
    Assert.confirmTubeIQSaveAndPrintButtonExists();
    onTubeIQInstanceView.clickSaveAndPrintButton();
    onTubeIQInstanceView.printTubeIQInstanceDocuments();
    Assert.verifyBasicConditionsDocumentDownloaded();
    onTubeIQInstanceView.deleteAllBasicConditionsDecisionProposalInstanceAttachments();
    onTubeIQInstanceView.attachSignedBasicConditionsDecisionProposalDocument();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**
   * 6. CREDIT DEPARTMENT HEAD
   * Verification of the proposed decision
   * Description:
   * • After the credit officer makes a decision proposal, the request is returned to the credit department head.  ✔️
   * • The manager receives the "Decision proposal verification" task in his inbox  ✔️
   *   • Opens a request and assigns to itself.  ✔️
   * • Reviews the data concerning the proposed decision.  ✔️
   * • The Credit department head checks whether the credit decision needs to be revised. [Dropdown option: Yes / No]
   *   • Sets the option NOT required (NO)  ✔️
   *   • Clicks "Confirm" button  ✔️
   * • The process has moved to the next task → "Printing the decision proposal" (at the credit officer's inbox)  ✔️
   */
  it('Verification of the proposed decision by credit department head', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForDecisionProposalVerificationCreditDptHead();
    Assert.checkTubeIQTasksListSearchDecisionProposalVerificationCreditDptHead();
    onTubeIQTasksPage.selectDecisionProposalVerificationFromListAsDptHead();
    Assert.confirmSelectedTubeIQDecisionProposalVerificationTaskDptHead();
    onTubeIQTasksPage.clickAssignToMeButton();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    onTubeIQInstanceView.verifyTubeIQVerificationProposalDataDptHead();
    onTubeIQInstanceView.setDecisionProposalRevisionToNo();
    Assert.verifyTubeIQDecisionRevisionIsSetToNo();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteRequestForwardingDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteRequestForwardingDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /** 7. CREDIT ADVISOR
   * PRINT CREDIT DECISION PROPOSAL (without revision)
   * Description:
   * • After the credit department head verifies the proposed decision and sets that there is no need for revision,
   * • The credit advisor receives the task "Printing the decision proposal" in his inbox.  ✔️
   * • The credit advisor opens the request and assigns it to himself (if not already assigned).  ✔️
   * • Checks that Credit department head's request revision decision is set to 'No/Ne'  ✔️
   * • In the Instance view, clicks the save and print button.  ✔️
   *   • In the pop-up window, the "Decision proposal document" is displayed.  ✔️
   *   • Click the "Print" button.  ✔️
   * • The document is successfully downloaded in .docx (Word) format.  ✔️
   *   • Content of the decision proposal has all previously entered elements & data from the questionnaire (automatically copied)  ✔️
   * • The credit advisor uploads the signed proposed decision document to the system (by dragging or clicking).  ✔️
   * • In the Instance view:
   *   • checks whether the upload is successful (the uploaded document is displayed in the list of attachemnts).  ✔️
   *   • clicks the "Confirm" button.
   * • The task is no longer in the list & the request is forwarded to the director of the risk management department  ✔️
   */
  it('Printing the credit decision proposal by credit advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForPrintingTheDecisionProposalCreditAdvisor();
    Assert.checkTubeIQTasksListSearchPrintingTheDecisionProposalCreditAdvisor();
    onTubeIQTasksPage.selectPrintingTheDecisionProposalFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQPrintingTheDecisionProposalTaskCreditAdvisor();
    Assert.confirmTubeIQPrintButtonExists();
    onTubeIQInstanceView.clickPrintButton();
    onTubeIQInstanceView.printTubeIQInstanceDocuments();
    Assert.verifyCreditDecisionPropositionDownloaded();
    onTubeIQInstanceView.deleteAllCreditFilePrintingAttachments();
    onTubeIQInstanceView.attachSignedCreditProposalDecisionDocument();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**8. CREDIT RISK MANAGEMENT DIRECTOR
   * DIRECTOR OF THE RISK MANAGEMENT DEPARTMENT
   * Forwarding the request to the risk advisor
   * Description:
   * • The director of the risk management department receives the task "Forwarding the request to the risk advisor" in the inbox  ✔️
   * • Assigns the task to himself by clicking on the "Assign to me" button  ✔️
   * • Reviews the basic elements of the request and data from the proposed decision on the loan request  ✔️
   * • Information about the guarantor (if any)
   * • Reviews documents in the "Attached documents" section  ✔️
   * • Selects a risk advisor from the drop-down list "Selection of risk advisors"  ✔️
   * After selecting the advisor, the director of the risk management department clicks the "Confirm" button ✔️
   *   • A task is automatically created in the inbox of the selected risk advisor
   *   • Task given to the advisor: "Request processing - Risk opinion"
   *   • The request is no longer in the inbox of the Director of the Risk Management Directorate
   */

  it('Forwarding the request to the Risk Advisor by the Risk Management Department Head (without guarantor)', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForForwardingTheRequestByRiskDptHead();
    Assert.checkTubeIQTasksListSearchForwardingTheRequestByRiskDptHead();
    onTubeIQTasksPage.selectForwardingTheRequestFromListAsRiskDptHead();
    Assert.confirmSelectedTubeIQForwardingTheRequestTaskRiskDptHead();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    onTubeIQInstanceView.reviewBasicDataOfForwardingTheRequestRiskDptHead();
    onTubeIQTasksPage.clickAssignToMeButton();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteRequestForwardingDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteRequestForwardingDocumentation()
    );
    onTubeIQTasksPage.navigateToInstanceTab();
    onTubeIQInstanceView.selectRiskAdvisorTubeIQ();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**9. RISK ADVISOR
   * REQUEST PROCESSING - RISK OPINION (without guarantor)
   * Description:
   * • The advisor of the organizational part for risks registers on the TubeIQ platform  ✔️
   * • He receives the task "Request processing - Risk opinion" in his inbox, and opens the request by clicking on the task ✔️
   * • Reviews the basic elements of the request ✔️
   * • The adviser sees the basic information data of the request ✔️
   * • Goes to attachments panel view and reviews the attached documentation ✔️
   * • Goes back to Instance panel and enters the required data ✔️
   * • On Instance panel view, access to the "Debt balance" button ✔️
   * • On Instance panel view, access to the "Exposure" button ✔️
   * • Set extra information selection to NO
   * • Uploads risk opinion document
   * • Click Confirm button and forwards the process to Risk Dpt head for verification
   */

  it('Request processing and risk opinion by Risk Advisor (without guarantor)', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForRiskOpinionByRiskAdvisor();
    Assert.checkTubeIQTasksListSearchRiskOpinionBySelectedRiskAdvisor();
    onTubeIQTasksPage.selectRiskOpinionFromListAsSelectedRiskAdvisor();
    Assert.confirmSelectedTubeIQRiskOpinionTaskSelectedRiskAdvisor();
    onTubeIQInstanceView.reviewBasicDataOfRiskOpinionByRiskAdvisor();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompletePropositionDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompletedRiskOpinionDocumentation()
    );
    onTubeIQTasksPage.navigateToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.setRiskOpinionInputs();
    onTubeIQInstanceView.clickApplicantExposureButton();
    Assert.verifyApplicantExposurePopupOpen();
    onTubeIQInstanceView.closePopUpTubeIQ();
    onTubeIQInstanceView.clickDebtStateButton();
    Assert.verifyDebtStatePopupOpen();
    onTubeIQInstanceView.closePopUpTubeIQ();
    onTubeIQInstanceView.setRiskOpinionExtraInformationToNo();
    Assert.verifyRiskOpinionDocumentReadyForUpload();
    onTubeIQInstanceView.deleteAllRiskOpinionDocumentAttachments();
    onTubeIQInstanceView.attachRiskOpinionDocument();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**10. DIRECTOR OF THE RISK MANAGEMENT DEPARTMENT
   * VERIFICATION OF THE RISK OPINION (without guarantor)
   * Description:
   * • The director of the risk management department receives the task "Verification" in the inbox ✔️
   * • Assigns the task to himself by clicking on the "Assign to me" button ✔️
   * • Reviews completed information from the adviser ✔️
   * • Goes to attachments tab and reviews the Risk opinion document (.docx/Word) and that all attached documentation is available ✔️
   * • Navigate back to Instance view panel
   *   • Sets 'Do you verify the Risk opinion?' dropdown input to Yes / Da
   * • Clicks the "Confirm" button:
   *   • The request is returned to the risk advisor
   *   • The advisor receives the task "Finalization of the risk opinion"
   *   • The advisor uploads the signed Risk opinion and forwards it to the credit officer
   */
  it('Verification of the Risk opinion by Risk Management Department Head (without guarantor)', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForRiskOpinionVerificationByRiskDptHead();
    Assert.checkTubeIQTasksListSearchRiskOpinionVerificationByRiskDptHead();
    onTubeIQTasksPage.selectRiskOpinionForVerificationFromListAsRiskDptHead();
    Assert.confirmSelectedTubeIQRiskOpinionVerificationTaskRiskDptHead();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.clickAssignToMeButton();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    onTubeIQInstanceView.reviewRiskOpinionVerificationDataAsRiskDptHead();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteRiskDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteRiskOpinionVerificationDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.setRiskDptHeadVerificationToYes();
    Assert.verifyTubeIQRiskVerificationIsSetToYes();
    onTubeIQInstanceView.clickSubmitButton();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**11. DIRECTOR OF THE RISK MANAGEMENT DEPARTMENT
   * FINALIZATION OF RISK OPINION - DIRECTOR OF THE RISK MANAGEMENT DEPARTMENT
   * Description:
   * • Director of the risk management department receives the task "Finalization of the risk opinion" in his inbox ✔️
   * • Goes to the attachments panel and checks if the documentation is complete ✔️
   * • Returns to the Instance panel view and selects the Risk Advisor from the dropdown list for further processing ✔️
   * • Clicks the "Submit" button ✔️
   */
  it('Finalisation of Risk Opinion by Risk Management Department Head', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForRiskOpinionFinalizationByRiskDptHead();
    Assert.checkTubeIQTasksListSearchRiskOpinionFinalizationBySelectedRiskAdvisor();
    onTubeIQTasksPage.selectRiskOpinionFinalizationFromListAsSelectedRiskAdvisor();
    Assert.confirmSelectedTubeIQRiskOpinionTaskSelectedRiskAdvisor();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteRiskDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteRiskOpinionVerificationDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.selectOpinionFinalizationRiskAdvisorTubeIQ();
    Assert.verifyTubeIQRiskVerificationCreditAdvisorIsSet();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**12. RISK ADVISOR
   * FINALISATION OF RISK OPINION - RISK ADVISOR
   * Description:
   * • The risk advisor receives the task "Finalization of the risk opinion" in his inbox ✔️
   * • He assigns himself that task ✔️
   * • The advisor reviews the Risk opinion data on Instance panel view ✔️
   * • Prints / downloads the final document (either Attachments or Print documents tab ) ✔️
   * • Deletes the old Risk opinion document attached on Instance panel attachments section at the bottom of the page ✔️
   * • Uploads the signed document (with both signatures) to the system by dragging the file or by clicking on the upload field ✔️
   *   • The system displays: [Risk opinion - SIGNED.pdf] ??? // check if this is the case!! ✔️
   * • After uploading the signed Risk opinion the advisor clicks the "Confirm" or "Forward" button ✔️
   *   • The request is automatically forwarded to the credit officer
   *   • The credit officer receives the task "Completing the proposal with a risk opinion"
   */
  it('Finalisation of Risk Opinion by Risk Advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForRiskOpinionCompletionByRiskAdvisor();
    Assert.checkTubeIQTasksListSearchRiskOpinionCompletionBySelectedRiskAdvisor();
    onTubeIQTasksPage.selectRiskOpinionCompletionFromListAsSelectedRiskAdvisor();
    Assert.confirmSelectedTubeIQRiskOpinionCompletionTaskSelectedRiskAdvisor();
    onTubeIQInstanceView.selectCreditProposalCompletionLegalAdvisorTubeIQ();
    Assert.verifyTubeIQRiskProposalCompletionLegalAdvisorIsSet();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**13. LEGAL SERVICE OFFICER
   * DECISION IO BY LEGAL SERVICE OFFICER
   * Description:
   * • Receives the task "IO Decision" in inbox. ✔️
   * • The request arrives after the credit officer completes the proposal with a risk opinion ✔️
   * • Opens the request by clicking on the task ✔️
   * • Reviews the available documentation within Attachments panel view
   * • Sets the date of the IO session - e.g. Date picker: e.g. January 26, 2026 ✔️
   * • Enters the IO decision number (text field) ✔️
   * • - Format: e.g. IO-123/2025 or according to the internal numbering of AOFI Example: IO decision number: IO-025/2026
   * • Within input field "Is a Board meeting required?"" selects the option "Ne/No" ✔️
   * • Clicks "Save and print" button on the Instance panel view ✔️
   * • - If the legal officer uploads the decision immediately:
   * • - Creates the "Decision IO" document outside the system, Ensures the signature of the President of the Executive Board
   * • Upload the proposed decision from the IO session (signed) ✔️
   * • - Uploads to the system by dragging the file or clicking on the "Choose" button
   * • Clicks the "Submit" button
   * • - The request goes to the task "Creating a decision"
   * • - The legal service clerk gets a new task
   */
  it('Decision IO by Legal Service Officer', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForDecisionIOByLegalServiceOfficer();
    Assert.checkTubeIQTasksListSearchDecisionIOBySelectedLegalServiceOfficer();
    onTubeIQTasksPage.selectDecisionIOFromListAsSelectedLegalServiceOfficer();
    Assert.confirmSelectedTubeIQDecisionIOTaskSelectedLegalServiceOfficer();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteDecisionIODocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteRiskOpinionVerificationDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.setDecisionIOInputs();
    Assert.confirmTubeIQPrintButtonExists();
    onTubeIQInstanceView.clickPrintButton();
    onTubeIQInstanceView.printTubeIQInstanceDocuments();
    Assert.confirmInstancePageIsLoaded();
    Assert.verifyDecisionIODocumentDownloaded();
    onTubeIQInstanceView.deleteAllCreditFilePrintingAttachments();
    onTubeIQInstanceView.attachSignedDecisionIODocument();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**14. LEGAL SERVICE OFFICER
   * CREATION OF A DECISION BY LEGAL SERVICE OFFICER
   * Description:
   * • Receives the task "Creating a decision" in inbox. ✔️
   * • Opens the request by clicking on the task ✔️
   * • Reviews the available documentation within Attachments panel view ✔️
   * • The legal service officer chooses the decision of the competent body and selects option "Positive" ✔️
   * • Uploads the decision document by dragging the file or by clicking on the upload field,
   * in the "Decision after the sessions of the competent body" section ✔️
   * • Clicks "Submit" button ✔️
   * • The request goes to the credit officer on the task "Implementing the decision" ✔️
   */
  it('Creation of a decision by Legal Service Officer', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForDecisionCreationByLegalServiceOfficer();
    Assert.checkTubeIQTasksListSearchDecisionCreationBySelectedLegalServiceOfficer();
    onTubeIQTasksPage.selectDecisionCreationFromListAsSelectedLegalServiceOfficer();
    Assert.confirmSelectedTubeIQDecisionCreationTaskSelectedLegalServiceOfficer();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteDecisionCreationDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteDecisionCreationDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.setDecisionCreationToPositive();
    onTubeIQInstanceView.deleteAllCreditDecisionCreationAttachments();
    onTubeIQInstanceView.attachSignedDecisionCreationDocument();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**15. LEGAL SERVICE OFFICER
   * CONTRACT CREATION BY LEGAL SERVICE OFFICER
   * Description:
   * • Request reception Task "Create contract" ✔️
   * • Documentation review ✔️
   * • Insight into all elements of the request ✔️
   * • Fills in missind Contract data ✔️
   *   • All contract elements filled in
   * • Uploads the document 'Obaveštenje o dostavljenoj dokumentaciji.docx' to the system
   * • Forwarding to credit officer Status: "Contract created" → Credit officer
   */
  it('Contract creation by Legal Service Officer', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForContractCreationByLegalServiceOfficer();
    Assert.checkTubeIQTasksListSearchContractCreationBySelectedLegalServiceOfficer();
    onTubeIQTasksPage.selectContractCreationFromListAsSelectedLegalServiceOfficer();
    Assert.confirmSelectedTubeIQDecisionCreationTaskSelectedLegalServiceOfficer();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteContractCreationDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteContractCreationDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.reviewAndCompleteContractCreationDataByLegalService();
    onTubeIQInstanceView.deleteAllContractCreationDocumentAttachments();
    onTubeIQInstanceView.attachNoticeOnSubmittedDocumentationDocument();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**16. CREDIT ADVISOR
   * PREPARATION FOR THE CONTRACT REALIZATION BY THE CREDIT ADVISOR
   * Description:
   * • Request reception Task "Preparation for the realization" ✔️
   * • Documentation review ✔️
   * • The credit advisor checks the submitted documentation (attachments) ✔️
   * • In the drop-down menu, input the field "Has the consent of the legal sector been secured?" selects the Yes option
   * • The credit advisor enters the account number for payment
   * • The credit advisor uploads the agreement
   * • The request is forwarded to the Associate in the finance sector for Implementation
   * • Status: "Signed contract - ready for implementation"
   */

  it('Preparation for the contract realization by the Credit Advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForPreparationOfContractRealizationByCreditAdvisor();
    Assert.checkTubeIQTasksListSearchContractCreationBySelectedCreditAdvisor();
    onTubeIQTasksPage.selectPreparationForContractRealizationFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQPreparationForContractRealizationTaskSelectedCreditAdvisor();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteContractCreationDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteContractRealizationPreparationDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.fillInPreparationForContractRealizationDataByCreditAdvisor();
    onTubeIQInstanceView.deleteAllPreparatioForCreditRealizationAttachments();
    onTubeIQInstanceView.attachDocumentConsent();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**17. CREDIT ADVISOR
   * CONTRACT SIGNING BY THE CREDIT ADVISOR
   * Description:
   * • Request reception Task "Contract signing"
   * • The credit advisor checks the submitted documentation (attachments)
   * • Instance data review
   * • Clicks the button "Save and print"
   * • Uploads SIGNED document "Potpisan ugovor.docx" to the system
   * • Forwards the contract to further processing
   */

  it('Contract signing by the Credit Advisor', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForContractSigningByCreditAdvisor();
    Assert.checkTubeIQTasksListSearchContractSigningBySelectedCreditAdvisor();
    onTubeIQTasksPage.selectContractSigningFromListAsCreditAdvisor();
    Assert.confirmSelectedTubeIQContractSigningTaskSelectedCreditAdvisor();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteContractSigningDocumentationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteContractSigningDocumentation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.reviewAllContractSigningDataByCreditAdvisor();
    Assert.confirmTubeIQPrintButtonExists();
    onTubeIQInstanceView.clickPrintButton();
    onTubeIQInstanceView.printTubeIQInstanceDocuments();
    Assert.verifySignedContractDocumentDownloaded();
    onTubeIQInstanceView.deleteContractSigningAttachments();
    onTubeIQInstanceView.attachSignedContractDocument();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /**18. FINANCE SERVICE OFFICER
   * CREDIT REALISATION BY THE FINANCE SERVICE OFFICER
   * Description:
   * • Receives the task "Realisation" in inbox. ✔️
   * • Opens the request by clicking on the task ✔️
   * • The Finance service assigns the task to himself ✔️
   * • Reviews the available documentation within Attachments panel view ✔️
   * • Reviews the data on the Instance panel view ✔️
   * • Clicks the "Submit" button ✔️
   *   • The process is completed and closed ✔️
   */
  it('Credit realisation by the Finance Service Officer', () => {
    Assert.confirmTubeIQDashboardURL();
    onTubeIQHomePage.clickNavigationBar();
    onTubeIQHomePage.selectAllFromInbox();
    Assert.confirmTubeIQTasksPageURL();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQTasksPage.setSearchForCreditRealisationByFinanceServiceOfficer();
    Assert.checkTubeIQTasksListSearchContractRealisationByAnyFinanceOfficer();
    onTubeIQTasksPage.selectContractRealisationFromListAsFinanceOfficer();
    Assert.confirmSelectedTubeIQContractRealisationTaskAnyFinanceOfficer();
    onTubeIQTasksPage.clickAssignToMe();
    Assert.verifyTubeIQTaskSuccessfullyAssignedToSelectedUser();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.reviewContractRealisationData();
    onTubeIQTasksPage.navigateToAttachmentsTab();
    Assert.verifyCompleteContractSigningDocumentationWithRealisationInTubeIQ(
      onTubeIQAttachmentsView.getCompleteContractSigningDocumentationWithRealisation()
    );
    onTubeIQTasksPage.goToInstanceTab();
    Assert.confirmInstancePageIsLoaded();
    onTubeIQInstanceView.clickSubmitButtonTubeIQ();
    Assert.verifyCreditRequestSentForFurtherProcessing();
  });

  /* Below is a Test for auto log off function
   * NOTE:
   * The goal of the test was to see if the cookie token and the post token match, because this validation is behind ASP.NET's
   * anti-forgery mechanism.
   * Why do we get 500 instead of 401/403:
   * - ASP.NET MVC/Core uses the ValidateAntiForgeryToken attribute.
   * It checks whether the value from the hidden input (__RequestVerificationToken) corresponds to the value from the cookie.
   * - If they do not match or one is missing, the framework throws an exception (HttpAntiForgeryException).
   * - If the exception is not properly caught in the controller or global error handler, IIS returns a 500 Internal Server Error.
   * - It would be correct for the application to catch that exception and return 401 Unauthorized or 403 Forbidden,
   * but in this implementation it was not done → that's why we get response code 500.
   * What was proven by the test:
   * - Cookie token and post token are different > validation crashes.
   * - The server throws an exception > returns 500.
   * - So, the cause is not Cypress or the browser, but token mismatch and bad error handling in the application.
   * How it should look:
   * - When the tokens do not match > the server should return 401/403, not 500.
   * - When they match > LogOff passes and returns a redirect to login.
   * What to do:
   * - On the test environment (client side (test)): check that both tokens exist, but do not compare them directly (because they are different in design).
   * - It is important that both are sent.
   * - On the server side: add a global error handler (eg Application_Error in Global.asax or UseExceptionHandler in ASP.NET Core) to map HttpAntiForgeryException to 401/403, instead of firing 500.
   * Debugging:
   * - Check whether the hidden input token is regenerated on every page and whether the cookie token is refreshed.
   * - If they are not synchronized, we will get a token value mismatch.
   * - The test revealed that the real cause of the LogOff error 500 endpoint is: token mismatch + bad error handling.
   * The application should return 401/403, but since the exception was not handled correctly, it returns 500.
   */
  // it.skip('testLogOFFError500', () => {
  //   cy.get('input[name="__RequestVerificationToken"]')
  //     .invoke('val')
  //     .then((tokenFromDom) => {
  //       cy.getCookie('__RequestVerificationToken').then((cookie) => {
  //         expect(tokenFromDom).to.eq(cookie.value);
  //       });
  //     });
});

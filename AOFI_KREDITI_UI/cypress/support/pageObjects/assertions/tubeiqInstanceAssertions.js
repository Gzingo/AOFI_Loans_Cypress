export class TubeIQInstanceAssertions {
  verifyTubeIQRiskVerificationIsSetToYes() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          // Uses Assert from index -- must reference via this pattern to avoid circular deps
          cy.get(`.fill-row:nth-child(${10 + 1})`).within(() => {
            cy.get('.form-field .form-field__label-helper').should('contain.text', 'Verifikacija direktora rizika');
            cy.get('.form-field .form-field__control')
              .find(
                'textarea.e-input, input.e-input, input.app-input, input.e-numerictextbox, input.e-maskedtextbox'
              )
              .should('exist')
              .then(($el) => {
                const val = $el.val() || $el.attr('value') || $el.text() || $el.attr('placeholder');
                const normalize = (s) =>
                  s.replace(/[\u041A]/g, 'K').replace(/\s+/g, ' ').trim();
                expect(normalize(val)).to.include(normalize('Da'));
              });
          });
        });
    });
  }

  verifyTubeIQRiskVerificationCreditAdvisorIsSet() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.get(`.fill-row:nth-child(${0 + 1})`).within(() => {
            cy.get('.form-field .form-field__label-helper').should('contain.text', 'Odabir kreditnog referenta');
            cy.get('.form-field .form-field__control')
              .find(
                'textarea.e-input, input.e-input, input.app-input, input.e-numerictextbox, input.e-maskedtextbox'
              )
              .should('exist')
              .then(($el) => {
                const val = $el.val() || $el.attr('value') || $el.text() || $el.attr('placeholder');
                const normalize = (s) =>
                  s.replace(/[\u041A]/g, 'K').replace(/\s+/g, ' ').trim();
                expect(normalize(val)).to.include(normalize('Nikola Nikolic'));
              });
          });
        });
    });
  }

  verifyTubeIQRiskProposalCompletionLegalAdvisorIsSet() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.get(`.fill-row:nth-child(${0 + 1})`).within(() => {
            cy.get('.form-field .form-field__label-helper').should('contain.text', 'Odabir referenta pravne službe');
            cy.get('.form-field .form-field__control')
              .find(
                'textarea.e-input, input.e-input, input.app-input, input.e-numerictextbox, input.e-maskedtextbox'
              )
              .should('exist')
              .then(($el) => {
                const val = $el.val() || $el.attr('value') || $el.text() || $el.attr('placeholder');
                const normalize = (s) =>
                  s.replace(/[\u041A]/g, 'K').replace(/\s+/g, ' ').trim();
                expect(normalize(val)).to.include(normalize('Nikola Nikolic'));
              });
          });
        });
    });
  }

  verifyTubeIQDecisionRevisionIsSetToNo() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container tubeiq-dynamic-behavior')
        .should('exist')
        .within(() => {
          cy.get(`.fill-row:nth-child(${12 + 1})`).within(() => {
            cy.get('.form-field .form-field__label-helper').should('contain.text', 'Da li je potrebna dorada kreditne odluke?');
            cy.get('.form-field .form-field__control')
              .find(
                'textarea.e-input, input.e-input, input.app-input, input.e-numerictextbox, input.e-maskedtextbox'
              )
              .should('exist')
              .then(($el) => {
                const val = $el.val() || $el.attr('value') || $el.text() || $el.attr('placeholder');
                const normalize = (s) =>
                  s.replace(/[\u041A]/g, 'K').replace(/\s+/g, ' ').trim();
                expect(normalize(val)).to.include(normalize('Ne'));
              });
          });
        });
    });
  }

  verifyTubeIQInstanceInputsDataLoadedDptHead() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          const expectedValues = {
            1: 'Pravno lice',
            2: 'QATesting',
            5: 'adresaPrva',
            6: 'Кratkoročni kredit sa planom otplate',
            7: '420.002',
            8: 'EUR',
            9: '12',
          };
          Object.entries(expectedValues).forEach(([index, value]) => {
            cy.getTubeIQInstanceInputs(Number(index)).should('have.value', value);
          });
          cy.getTubeIQInstanceInputs(3).assertReadonlyDigits(8);
          cy.getTubeIQInstanceInputs(4).assertReadonlyDigits(9);
          cy.get('.fill-row')
            .eq(11)
            .find('textarea')
            .should('contain', 'Automation test AOFI loan request legal entity');
        });
    });
  }

  verifyTubeIQInstanceInputsDataLoadedCreditAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          const expectedValues = {
            1: 'QATesting',
            4: 'Кratkoročni kredit sa planom otplate',
            5: '420.002',
            6: 'EUR',
            7: '12',
          };
          Object.entries(expectedValues).forEach(([index, value]) => {
            cy.getTubeIQInstanceInputs(Number(index)).should('have.value', value);
          });
          cy.getTubeIQInstanceInputs(2).assertReadonlyDigits(8);
          cy.getTubeIQInstanceInputs(3).assertReadonlyDigits(9);
          cy.get('.fill-row')
            .eq(9)
            .find('textarea')
            .should('contain', 'Automation test AOFI loan request legal entity');
        });
    });
  }

  verifyInstanceInputsDisabled() {
    cy.intercept('GET', '/common/getBehaviorAttachments*').as('getBehaviorAttachments');
    cy.get('#tasks-view-container').within(() => {
      cy.wait('@getBehaviorAttachments').its('response.statusCode').should('eq', 200);
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          const indices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12];
          indices.forEach((i) => {
            cy.getTubeIQInstanceInputs(i).should('have.attr', 'readonly');
          });
          cy.get('.fill-row').eq(11).find('textarea').should('have.attr', 'readonly');
        });
    });
  }

  verifyCollateralOptionSetIsDisplayed(rowIndex, optionSet) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1}) .tubeiq-select`).should('contain.text', optionSet);
    cy.document().then((doc) => {
      const grid = doc.querySelector('ejs-grid.tubeiq-table-grid');
      if (!grid || grid.offsetParent === null) {
        throw new Error('Table not displayed!!');
      }
      cy.log('Table is successfully displayed.');
    });
  }

  verifyCollateralTableIsDisplayedWithValidData(rowIndex, tableName, dataValues) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      cy.get('.form-field .form-field__control').should('contain.text', tableName);
      if (typeof dataValues === 'string') {
        if (dataValues.includes('||')) {
          const variants = dataValues.split('||').map((v) => v.trim());
          cy.get(
            '.form-field .form-field__control ejs-grid .e-gridcontent table tbody'
          ).shouldContainAnyText(variants);
        } else {
          cy.get('.form-field .form-field__control ejs-grid .e-gridcontent table tbody').should(
            'contain.text',
            dataValues
          );
        }
      } else if (Array.isArray(dataValues)) {
        cy.get(
          '.form-field .form-field__control ejs-grid .e-gridcontent table tbody'
        ).shouldContainAnyText(dataValues);
      } else {
        const values = Object.values(dataValues);
        values.forEach((value) => {
          cy.get('.form-field .form-field__control ejs-grid .e-gridcontent').should(
            'contain.text',
            value
          );
        });
      }
    });
  }

  verifyCollateralTextboxIsDisplayedWithValidData(rowIndex, tableName, expectedTextareaValue) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      cy.get('.form-field .form-field__label-helper').should('contain.text', tableName);
      cy.get('ejs-textbox textarea.e-input')
        .should('exist')
        .invoke('val')
        .then((val) => {
          if (expectedTextareaValue) {
            expect(val).to.contain(expectedTextareaValue);
          } else {
            expect(val).not.to.be.empty;
          }
        });
    });
  }

  verifyTubeIQInstanceInputsAreDisplayedWithValidData(rowIndex, tableName, expectedValue) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      cy.get('.form-field .form-field__label-helper').should('contain.text', tableName);
      cy.get('.form-field .form-field__control')
        .find(
          'textarea.e-input, input.e-input, input.app-input, input.e-numerictextbox, input.e-maskedtextbox'
        )
        .should('exist')
        .then(($el) => {
          const val = $el.val() || $el.attr('value') || $el.text() || $el.attr('placeholder');
          if (expectedValue) {
            const normalize = (s) =>
              s
                .replace(/[\u041A]/g, 'K')
                .replace(/\s+/g, ' ')
                .trim();
            expectedValue.split('\n').forEach((line) => {
              expect(normalize(val)).to.include(normalize(line));
            });
          } else {
            expect(val).not.to.be.empty;
          }
        });
    });
  }

  verifyCollateralLiquidityAndRatingTextboxIsDisplayedWithValidData(
    rowIndex,
    tableName,
    expectedTextareaValue
  ) {
    cy.get(`.fill-row:nth-child(${rowIndex + 1})`).within(() => {
      cy.get('.form-field .form-field__label-helper').should('contain.text', tableName);
      cy.get('input.e-maskedtextbox')
        .should('exist')
        .invoke('val')
        .then((val) => {
          if (expectedTextareaValue) {
            expect(val).to.contain(expectedTextareaValue);
          } else {
            expect(val).not.to.be.empty;
          }
        });
    });
  }

  verifyInstanceInputsEnabled() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          const dropdownIndices = [1, 6, 8];
          dropdownIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('ejs-dropdownlist')
                  .should('exist')
                  .should('have.attr', 'aria-disabled', 'false')
                  .and('not.be.disabled');
              });
          });
          const inputIndices = [2, 3, 4, 5, 7, 9, 12];
          inputIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('input').should('exist').should('not.be.disabled');
              });
          });
          cy.get('.fill-row')
            .eq(11)
            .within(() => {
              cy.get('textarea').should('exist').should('not.be.disabled');
            });
        });
    });
  }

  verifyInstanceInputsEnabledCreditAdvisor() {
    cy.get('#tasks-view-container').within(() => {
      cy.get('#behavior-container behavior-row-renderer')
        .should('exist')
        .within(() => {
          const dropdownIndices = [4, 6, 11];
          dropdownIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('ejs-dropdownlist')
                  .should('have.attr', 'aria-disabled', 'false')
                  .and('not.be.disabled');
              });
          });
          const inputIndices = [1, 2, 3, 5, 7, 8, 10];
          inputIndices.forEach((i) => {
            cy.get('.fill-row')
              .eq(i)
              .within(() => {
                cy.get('input').should('exist').should('not.be.disabled');
              });
          });
          cy.get('.fill-row')
            .eq(9)
            .within(() => {
              cy.get('textarea').should('exist').should('not.be.disabled');
            });
        });
    });
  }

  verifyTubeIQComments(expectedComment) {
    const { onAPI } = require('../API');
    onAPI.waitForTubeIQTaskCommentsToLoad();
    cy.get('form .form-group').within(() => {
      cy.get('.CountComments')
        .invoke('text')
        .then((text) => {
          const count = parseInt(text.replace(/[^\d]/g, ''), 10);
          expect(count).to.be.greaterThan(0);
          cy.clickLoadMoreTubeIQCommentsByCount(count);
        });
      cy.get('.comment-listFalse [data-typename="CaseComment"]')
        .last()
        .within(() => {
          cy.get('.comment-post')
            .invoke('text')
            .then((text) => {
              expect(text.trim()).to.eq(expectedComment);
            });
        });
    });
  }

  verifyTubeIQConflictOfInterestsIsSet(value) {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li postoji konflikt interesa?')
      .within(() => {
        cy.get('span.e-input-group').should('contain', value);
      });
  }

  verifyTubeIQLoanSplittingIsSet(value) {
    cy.scrollToBottom(1);
    cy.get('.fill-row')
      .eq(11)
      .should('exist')
      .and('contain', 'Da li dolazi do razdvajanja kredita?')
      .within(() => {
        cy.get('span.e-input-group').should('contain', value);
      });
  }
}

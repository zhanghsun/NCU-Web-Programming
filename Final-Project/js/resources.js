/**
 * Resources Module
 * ==================
 * Handles the ecological exploration gateway cards.
 * Each card opens the resource info modal via showResource() (modal.js).
 */

function initResources() {
    setupGatewayCards();
}

/**
 * Bind click & keyboard events to the three .res-card gateway cards.
 *
 * Every .res-card is focusable (tabindex="0") and announced as a button
 * (role="button"), so all of them need the keydown handler below —
 * role alone adds no behaviour and <article> gets no free Enter/Space
 * activation. The selector previously required [data-resource-title],
 * which only the third card carries, so the first two were focusable
 * but impossible to activate from the keyboard (WCAG 2.1.1).
 *
 * Cards that navigate via their own inline onclick fall through the
 * click handler as a no-op and are driven by this.click() instead.
 */
function setupGatewayCards() {
    document.querySelectorAll('.res-card').forEach(card => {
        card.addEventListener('click', function () {
            const href = this.getAttribute('data-href');
            if (href) {
                window.location.href = href;
                return;
            }
            const title = this.getAttribute('data-resource-title');
            const text  = this.getAttribute('data-resource-text');
            if (title && text && typeof showResource === 'function') {
                showResource(title, text);
            }
        });

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}


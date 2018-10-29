from django.conf import settings
from waffle import flag_is_active

from .constants import CONTRIBUTION_BETA_FLAG, CONTRIBUTION_RECURRING_PAYMENT_BETA_FLAG


def enabled(request):
    """Return True if contributions are enabled."""
    return bool(settings.MDN_CONTRIBUTION)


def popup_enabled(request):
    """Returns True if the popup is enabled for the user."""
    return (enabled(request) and
            hasattr(request, 'user') and
            flag_is_active(request, CONTRIBUTION_BETA_FLAG))


def recurring_payment_enabled(request):
    """Returns True if recurring payment is enabled for the user."""
    return (enabled(request) and
            hasattr(request, 'user') and
            flag_is_active(request, CONTRIBUTION_RECURRING_PAYMENT_BETA_FLAG))
